import Grid from "./components/Grid";

const Experience = () => {
  return (
    <section className="border-x border-b border-light-border px-5 py-20 sm:px-8 sm:py-24 lg:px-16 lg:py-32">
      <h4 className="mb-1 font-satoshi text-[18px] italic text-primary sm:text-[22px]">
        {"// Stacks & Experience"}
      </h4>
      <h3 className="mb-8 font-satoshi text-[28px] font-bold leading-tight text-[#3d3d3d] sm:text-[36px] sm:text-justify">
        {"Where I'm good and where I learned from"}
      </h3>

      <Grid />
    </section>
  );
};

export default Experience;
