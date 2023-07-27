'use client'

import Link from "next/link";
import { motion as m } from "framer-motion";

type Props = {
  href: string;
  text: string;
  index: number;
};

export default function NavLink({ href, text, index }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2 }}
    >
      <Link href={href}>{text}</Link>
    </m.div>
  );
}
