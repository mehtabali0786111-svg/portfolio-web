import { featuredWorks } from "../featuredWorks.data";
import WorkCard from "./WorkCard";

const WorkFooter = () => {
  return <WorkCard work={featuredWorks[3]} layout="horizontal" />;
};

export default WorkFooter;
