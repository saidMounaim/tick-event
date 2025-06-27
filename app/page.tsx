import { About } from "@/components/shared/sections/about";
import { Hero } from "@/components/shared/sections/hero";
import { LatestEvents } from "@/components/shared/sections/latest-events";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <LatestEvents />
    </>
  );
}
