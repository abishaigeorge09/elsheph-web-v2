/**
 * The dark-field chrome store — ONE attribute, no header forks.
 *
 * Pages whose TOP section sits on a dark field (espresso, oxblood, olive)
 * mount <DarkChrome />, which registers here. The store keeps a mount count
 * (so nested or doubled mounts cannot fight), mirrors the boolean onto
 * `<html data-dark-field>` for the CSS in globals.css Layer E3, and lets the
 * header subscribe via useSyncExternalStore so the wordmark swaps to the
 * cream knockout while the bar is transparent — the same mechanism family
 * as `data-home`, generalised.
 */

type Listener = () => void;

let mounts = 0;
const listeners = new Set<Listener>();

function sync() {
  if (typeof document === "undefined") return;
  if (mounts > 0) {
    document.documentElement.setAttribute("data-dark-field", "");
  } else {
    document.documentElement.removeAttribute("data-dark-field");
  }
  listeners.forEach((listener) => listener());
}

export function registerDarkField(): () => void {
  mounts += 1;
  sync();
  return () => {
    mounts -= 1;
    sync();
  };
}

export function subscribeDarkField(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDarkField(): boolean {
  return mounts > 0;
}

/** Server snapshot: the server never knows the route's field; false, and the
    client corrects on mount (the bar is transparent either way). */
export function getDarkFieldServer(): boolean {
  return false;
}
