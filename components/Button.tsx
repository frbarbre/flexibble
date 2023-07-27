import { MouseEventHandler } from "react";
import Image from "next/image";
import { text } from "stream/consumers";

type Props = {
  title: string;
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  type?: "button" | "submit";
  bgColor?: string;
  textColor?: string;
};

export default function Button({
  title,
  leftIcon,
  rightIcon,
  type,
  isSubmitting,
  handleClick,
  textColor,
  bgColor,
}: Props) {
  return (
    <button
      type={type || "button"}
      disabled={isSubmitting}
      className={`flexCenter gap-3 px-4 py-3 rounded-xl text-sm font-medium max-md:w-full 
      ${isSubmitting ? "bg-black/50" : bgColor || "bg-primary-purple"}
      ${textColor || "text-white"}`}
      onClick={handleClick}
    >
      {leftIcon && <Image src={leftIcon} width={14} height={14} alt="left" />}
      {rightIcon && (
        <Image src={rightIcon} width={14} height={14} alt="right" />
      )}
      {title}
    </button>
  );
}
