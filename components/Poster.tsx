"use client";

import { ProjectInterface } from "@/common.types";
import Image from "next/image";
import { motion as m } from "framer-motion";

type Props = {
  projectDetails: ProjectInterface;
};

export default function Poster({ projectDetails }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.4, delay: 0.5 }}
    >
      <Image
        src={projectDetails?.image}
        className="object-cover rounded-2xl"
        width={1064}
        height={798}
        alt="poster"
      />
    </m.div>
  );
}
