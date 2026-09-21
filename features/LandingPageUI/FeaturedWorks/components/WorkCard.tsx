import Image from "next/image";
import type { FeaturedWork } from "../featuredWorks.data";
import CompanyInfo from "./CompanyInfo";
import ContentBox from "./ContentBox";
import TimeBox from "./TimeBox";

interface WorkCardProps {
  work: FeaturedWork;
  layout?: "horizontal" | "vertical";
}

const WorkCard = ({ work, layout = "vertical" }: WorkCardProps) => {
  const isHorizontal = layout === "horizontal";

  return (
    <article
      className={`overflow-hidden rounded-2xl border border-light-border bg-light shadow-md ${
        isHorizontal ? "grid lg:grid-cols-[0.95fr_1.05fr]" : "flex flex-col"
      }`}
    >
      <Image
        src={work.imageSrc}
        width={520}
        height={320}
        alt={work.imageAlt}
        className={`h-full w-full object-cover ${
          isHorizontal
            ? "aspect-[1.45] max-h-[300px] lg:min-h-[320px] lg:max-h-none"
            : "aspect-[1.45] max-h-[260px]"
        }`}
      />
      <div
        className={
          isHorizontal
            ? "flex flex-col justify-between "
            : "flex h-full flex-col justify-between"
        }
      >
        <ContentBox title={work.title} description={work.description}>
          <TimeBox time={work.duration} />
          <TimeBox time={work.year} />
        </ContentBox>
        <CompanyInfo
          company={work.company}
          role={work.role}
          logoSrc={work.logoSrc}
        />
      </div>
    </article>
  );
};

export default WorkCard;
