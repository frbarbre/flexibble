"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion as m } from "framer-motion";
import { categoryFilters } from "@/constants";

export default function Categories() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  function handleTags(filter: string) {
    router.push(`${pathName}?category=${filter}`);
  }

  return (
    <div className="flexBetween w-full gap-5 flex-wrap">
      <ul className="flex gap-2 overflow-x-auto overflow-y-hidden">
        {categoryFilters.map((filter, index) => (
          <m.button
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            key={filter}
            type="button"
            onClick={() => handleTags(filter)}
            className={`${
              category === filter
                ? "bg-light-white-300 font-medium"
                : "font-normal"
            } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
          >
            {filter}
          </m.button>
        ))}
      </ul>
    </div>
  );
}
