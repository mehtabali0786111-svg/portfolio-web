import { featuredWorks } from "./featuredWorks.data";
import WorkCard from "./components/WorkCard";
import Link from "next/link";

const FeaturedWorks = () => {
  const [leadWork, ...supportingWorks] = featuredWorks;

  return (
    <section id="work" className="scroll-mt-8 border-x border-b border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
      <h4 className="mb-1 font-satoshi text-[18px] italic text-primary sm:text-[22px]">
        {"// Featured works"}
      </h4>
      <h3 className="mb-8 font-satoshi text-[28px] font-bold leading-tight text-[#3d3d3d] sm:text-[36px] sm:text-justify">
        These are ones that taught me the most
      </h3>

      <div className="space-y-6">
        <Link href="/workdetail" className="mb-6 inline-block">
          <WorkCard work={leadWork} layout="horizontal" />
        </Link>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {supportingWorks.slice(0, 2).map((work) => (
            <Link key={work.id} href="/workdetail">
              <WorkCard work={work} />
            </Link>
          ))}
        </div>

        {supportingWorks.slice(2).map((work) => (
          <Link key={work.id} href="/workdetail">
            <WorkCard work={work} layout="horizontal" />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedWorks;
