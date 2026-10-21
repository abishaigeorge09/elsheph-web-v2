import StaffLine from "@/components/home/StaffLine";

/**
 * The homepage. Deliberately ONE component: a single non-scrolling viewport
 * (`scrollHeight === innerHeight`). See StaffLine for the composition.
 *
 * Everything that used to live on this page as scrolling sections lives on
 * real routes: /products, /about, /focus. Nothing was deleted; it was
 * relocated because it cannot fit a viewport that does not scroll.
 */
export default function Home() {
  return <StaffLine />;
}
