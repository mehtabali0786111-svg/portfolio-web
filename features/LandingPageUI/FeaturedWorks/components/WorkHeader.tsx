import { Content } from "next/font/google";
import Image from "next/image";
import React from "react";
import ContentBox from "./ContentBox";
const content = {
  title: "Building a Perfect Design System from Zero",
  description:
    "Joined the team when every single screen was built in complete isolation and there is no tokens, no components, no consistency.",
};
const WorkHeader = () => {
  return (
    <section className="flex gap-4 rounded-2xl border border-light-border shadow-md mb-6">
      <ContentBox title={content.title} description={content.description} />
      <Image
        src="/images/bannerImage1.jpg"
        width={200}
        height={100}
        alt="Work image"
        className="w-full h-auto rounded-r-2xl"
      />
    </section>
  );
};

export default WorkHeader;
