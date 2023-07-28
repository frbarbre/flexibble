"use client";

import { ProjectInterface, UserProfile } from "@/common.types";
import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import { motion as m } from "framer-motion";

type Props = {
  user: UserProfile;
};

const ProfilePage = ({ user }: Props) => {
  const projects = user?.projects?.edges
  
  const sortedArray = projects.sort(function (a, b) {
    if (a.node.updatedAt > b.node.updatedAt) {
      return -1;
    }
    if (a.node.updatedAt < b.node.updatedAt) {
      return 1;
    }
    return 0;
  });

  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
      <section className="flex items-center max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col lg:w-max w-full max-w-[739px]">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Image
              src={user?.avatarUrl}
              width={100}
              height={100}
              className="rounded-full"
              alt="user image"
            />
          </m.div>
          <m.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-bold mt-10"
          >
            {user?.name}
          </m.p>
          <m.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg"
          >
            Check out my Projects!⭐
          </m.p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            <Button
              title="Follow"
              leftIcon="/plus-round.svg"
              bgColor="bg-light-white-400 !w-max"
              textColor="text-black-100"
              hoverColor="hover:bg-light-white-400/70"
              delay={0.3}
            />
            <Link href={`mailto:${user?.email}`}>
              <Button title="Hire Me" leftIcon="/email.svg" delay={0.4} />
            </Link>
          </div>
        </div>

        {sortedArray.length > 0 ? (
          <m.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.4 }}
          >
            <Link href={`/project/${sortedArray[0]?.node?.id}`}>
              <Image
                src={sortedArray[0]?.node?.image}
                alt="project image"
                width={739}
                height={554}
                className="rounded-xl object-contain"
              />
              <p>{sortedArray[0]?.node?.createdBy?.updatedAt}</p>
            </Link>
          </m.div>
        ) : (
          <m.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.4, delay: 0.2 }}
          >
            <Image
              src="/profile-post.png"
              width={739}
              height={554}
              alt="project image"
              className="rounded-xl"
            />
          </m.div>
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>

        <div className="profile_projects">
          {sortedArray.map(
            ({ node }: { node: ProjectInterface }, index: number) => (
              <ProjectCard
                key={`${node?.id}`}
                id={node?.id}
                image={node?.image}
                title={node?.title}
                name={user.name}
                avatarUrl={user.avatarUrl}
                userId={user.id}
                index={index}
              />
            )
          )}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
