import { featuredWorks } from "../featuredWorks.data";
import WorkCard from "./WorkCard";

const WorkHeader = () => {
  return <WorkCard work={featuredWorks[0]} layout="horizontal" />;
};

export default WorkHeader;
