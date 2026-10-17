#!/usr/bin/env python3
"""Recover a Vercel CLI deployment's uploaded source into the current directory.

elsheph.com was deployed with `vercel deploy` from a folder that was later deleted, and the
source was never pushed to git. Vercel keeps the files of CLI deployments, so this rebuilds
the project from them.

Usage:  python3 scripts/recover-from-vercel.py <deployment-id> [--dry-run]

The CLI uploads the project under `src/`; that prefix is stripped. node_modules, .next and
build output are skipped. Requires the Vercel CLI, logged in to the owning account.
"""
import base64
import json
import os
import subprocess
import sys

SKIP_DIRS = {"node_modules", ".next", "out", ".vercel"}


def api(path):
    r = subprocess.run(["vercel", "api", path], capture_output=True, timeout=120)
    if r.returncode != 0:
        raise RuntimeError(f"vercel api {path} failed: {r.stderr.decode()[:300]}")
    return r.stdout


def main():
    dpl = sys.argv[1]
    dry = "--dry-run" in sys.argv
    tree = json.loads(api(f"/v6/deployments/{dpl}/files"))

    files = []

    def walk(nodes, prefix):
        for n in nodes:
            if n.get("type") == "directory":
                if n["name"] in SKIP_DIRS:
                    continue
                walk(n.get("children", []), prefix + n["name"] + "/")
            else:
                files.append((prefix + n["name"], n["uid"], n.get("mode", 0o100644)))

    src = next(n for n in tree if n["name"] == "src" and n.get("type") == "directory")
    walk(src.get("children", []), "")
    print(f"{len(files)} files to recover from {dpl}")
    if dry:
        for p, _, _ in files:
            print("  ", p)
        return

    failed = []
    for i, (path, uid, mode) in enumerate(files, 1):
        try:
            raw = api(f"/v8/deployments/{dpl}/files/{uid}")
            try:
                data = base64.b64decode(json.loads(raw)["data"])
            except (ValueError, KeyError, TypeError):
                data = raw  # some endpoints return the raw bytes
            os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
            with open(path, "wb") as fh:
                fh.write(data)
            if mode & 0o111:
                os.chmod(path, 0o755)
        except Exception as exc:  # keep going, report at the end
            failed.append((path, str(exc)[:120]))
        if i % 25 == 0:
            print(f"  {i}/{len(files)}")
    print(f"recovered {len(files) - len(failed)} of {len(files)}")
    for p, e in failed:
        print("  FAILED", p, e)
    sys.exit(1 if failed else 0)


if __name__ == "__main__":
    main()
