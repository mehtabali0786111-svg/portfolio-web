import { featuredWorks } from "./featuredWorks.data";
import WorkCard from "./components/WorkCard";

const FeaturedWorks = () => {
  const [leadWork, ...supportingWorks] = featuredWorks;

  return (
    <section className="border-x border-b border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
      <h4 className="mb-1 font-satoshi text-[18px] italic text-primary sm:text-[22px]">
        {"// Featured works"}
      </h4>
      <h3 className="mb-8 font-satoshi text-[28px] font-bold leading-tight text-[#3d3d3d] sm:text-[36px] sm:text-justify">
        These are ones that taught me the most
      </h3>

      <div className="space-y-6">
        <WorkCard work={leadWork} layout="horizontal" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {supportingWorks.slice(0, 2).map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>

        {supportingWorks.slice(2).map((work) => (
          <WorkCard key={work.id} work={work} layout="horizontal" />
        ))}
      </div>
    </section>
  );
};

export default FeaturedWorks;
