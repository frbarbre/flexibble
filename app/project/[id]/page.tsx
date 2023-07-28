import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/session";
import { getProjectDetails } from "@/lib/actions";
import Modal from "@/components/Modal";
import ProjectActions from "@/components/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects";
import { ProjectInterface } from "@/common.types";
import ProjectInformation from "@/components/ProjectInformation";
import Poster from "@/components/Poster";

export default async function Project({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getCurrentUser();
  const result = (await getProjectDetails(id)) as {
    project?: ProjectInterface;
  };

  if (!result?.project)
    return <p className="no-result-text">Failed to fetch project info</p>;

  const projectDetails = result?.project;

  const renderLink = `/profile/${projectDetails?.createdBy?.id}`;

  return (
    <Modal>
      <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
        <ProjectInformation
          renderLink={renderLink}
          projectDetails={projectDetails}
        />

        {session?.user?.email === projectDetails?.createdBy?.email && (
          <div className="flex justify-end items-center gap-2">
            <ProjectActions projectId={projectDetails?.id} />
          </div>
        )}
      </section>

      <section className="mt-14">
        <Poster projectDetails={projectDetails} />
      </section>

      <section className="flexCenter flex-col mt-20">
        <p className="max-w-5xl text-xl font-normal">
          {projectDetails?.description}
        </p>

        <div className="flex flex-wrap mt-5 gap-5">
          <Link
            href={projectDetails?.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🖥 <span className="underline">Github</span>
          </Link>
          <Image src="/dot.svg" width={4} height={4} alt="dot" />
          <Link
            href={projectDetails?.liveSiteUrl}
            target="_blank"
            rel="noreferrer"
            className="flexCenter gap-2 tex-sm font-medium text-primary-purple"
          >
            🚀 <span className="underline">Live Site</span>
          </Link>
        </div>
      </section>

      <section className="flexCenter w-full gap-8 mt-28">
        <span className="w-full h-0.5 bg-light-white-200" />
        <Link href={renderLink} className="min-w-[82px] h-[82px]">
          <Image
            src={projectDetails?.createdBy?.avatarUrl}
            className="rounded-full"
            width={82}
            height={82}
            alt="profile image"
          />
        </Link>
        <span className="w-full h-0.5 bg-light-white-200" />
      </section>

      <RelatedProjects
        userId={projectDetails?.createdBy?.id}
        projectId={projectDetails?.id}
      />
    </Modal>
  );
}
