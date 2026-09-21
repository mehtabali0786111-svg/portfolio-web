import { featuredWorks } from "../featuredWorks.data";
import WorkCard from "./WorkCard";

const Box2 = () => {
  return <WorkCard work={featuredWorks[2]} />;
};

export default Box2;
