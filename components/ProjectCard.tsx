"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string;
};

export default function ProjectCard({
  id,
  image,
  title,
  name,
  avatarUrl,
  userId,
}: Props) {
  const [randomLikes, setRandomLikes] = useState(0);
  const [randomViews, setRandomViews] = useState("");

  useEffect(() => {
    setRandomLikes(Math.floor(Math.random() * 1000));
    setRandomViews(
      String((Math.floor(Math.random() * 1000) / 100).toFixed(1) + "k")
    );
  }, []);

  let shortName = name;
  const nameSplit = name.split(" ");
  const firstName = nameSplit[0];
  const middleName = nameSplit[1];

  if (nameSplit.length > 1 && nameSplit.length < 3) {
    shortName = `${firstName[0]}. ${nameSplit[1]}`;
  }

  if (nameSplit.length === 3) {
    shortName = `${firstName[0]}. ${middleName[0]}. ${nameSplit[2]}`;
  }

  return (
    <div className="flexCenter flex-col rounded-2xl drop-shadow-card">
      <Link
        href={`/project/${id}`}
        className="flexCenter group relative w-full h-full"
      >
        <Image
          src={image}
          width={414}
          height={314}
          alt="Project Image"
          className="w-full h-full md:aspect-[13/10] object-cover rounded-2xl"
        />

        <div className="hidden group-hover:flex profile_card-title">
          <p className="w-full">{title}</p>
        </div>
      </Link>

      <div className="flexBetween w-full px-2 mt-3 font-semibold text-sm">
        <Link href={`/profile/${userId}`}>
          <div className="flexCenter gap-2">
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className="rounded-full"
              alt="Profile Image"
            />
            <p>{shortName}</p>
          </div>
        </Link>

        <div className="flexCenter gap-3">
          <div className="flexCenter gap-2">
            <Image src="/hearth.svg" width={13} height={12} alt="heart" />
            <p className="text-sm">{randomLikes}</p>
          </div>
          <div className="flexCenter gap-2">
            <Image src="/eye.svg" width={13} height={12} alt="eye" />
            <p className="text-sm">{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
