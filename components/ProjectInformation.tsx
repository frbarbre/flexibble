"use client";

import { ProjectInterface } from "@/common.types";
import Image from "next/image";
import Link from "next/link";
import { delay, motion as m } from "framer-motion";

type Props = {
  renderLink: string;
  projectDetails: ProjectInterface;
};

export default function ProjectInformation({
  renderLink,
  projectDetails,
}: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 20 }}
      transition={{ delay: 0.3 }}
      className="flex-1 flex items-start gap-5 w-full max-xs:flex-col"
    >
      <Link href={renderLink}>
        <Image
          src={projectDetails?.createdBy?.avatarUrl}
          width={50}
          height={50}
          alt="profile"
          className="rounded-full"
        />
      </Link>

      <div className="flex-1 flexStart flex-col gap-1">
        <p className="self-start text-lg font-semibold">
          {projectDetails?.title}
        </p>
        <div className="user-info">
            <Link href={renderLink}>{projectDetails?.createdBy?.name}</Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={`/?category=${projectDetails.category}`}
            className="text-primary-purple font-semibold"
          >
            {projectDetails?.category}
          </Link>
        </div>
      </div>
    </m.div>
  );
}
