"use client";

import {
  useCallback,
  useRef,
  ReactNode,
  MouseEvent,
  useState,
  useEffect,
} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion as m, AnimatePresence } from "framer-motion";

export default function Modal({ children }: { children: ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const duration = 0.3;

  const [active, setActive] = useState(true);

  const onDismiss = useCallback(() => {
    setActive(false);
    router.refresh();
    setTimeout(() => {
      router.back();
    }, duration * 1000);
  }, [router]);

  useEffect(() => {
    setActive(true);
  }, [onDismiss]);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );
  return (
    <div ref={overlay} className="modal" onClick={handleClick}>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-8 right-8"
      >
        <Image src="/close.svg" width={17} height={17} alt="close"></Image>
      </button>
      <AnimatePresence>
        {active && (
          <m.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: duration }}
            ref={wrapper}
            className="modal_wrapper"
          >
            {children}
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
