import HomeHero from "@/components/home/HomeHero";

/**
 * The homepage. Deliberately ONE component: a single non-scrolling viewport,
 * matching the a16z reference's measured behaviour
 * (`scrollHeight === innerHeight`). See HomeHero for the full reasoning.
 *
 * Everything that used to live on this page as scrolling sections — Products,
 * Services, How We Work, About, Contact — has moved to real routes:
 * /products, /about. Nothing was deleted; it was relocated because it can no
 * longer fit a viewport that does not scroll.
 */
export default function Home() {
  return <HomeHero />;
}
