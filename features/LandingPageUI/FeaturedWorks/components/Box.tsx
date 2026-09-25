import Link from "next/link";
import { featuredWorks } from "../featuredWorks.data";
import WorkCard from "./WorkCard";

const Box = () => {
  return (
    <>
      <Link href="/workdetail" className="cursor-pointer">
        <WorkCard work={featuredWorks[1]} />
      </Link>
    </>
  );
};

export default Box;
