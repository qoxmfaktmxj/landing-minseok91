"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectVisual({
  src,
  alt,
  name,
}: {
  src: string;
  alt: string;
  name: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 0.45, 1], [8, 0, -3]);
  const y = useTransform(scrollYProgress, [0, 1], [32, -24]);
  return (
    <div ref={ref} className="project-visual">
      <div className="project-visual-title" aria-hidden="true">
        {name}
      </div>
      <motion.div className="project-screen" style={{ rotateX, y }}>
        <div className="screen-toolbar" aria-hidden="true">
          <div>
            <i />
            <i />
            <i />
          </div>
          <span>{name}</span>
          <ArrowUpRight size={10} aria-hidden="true" />
        </div>
        <div className="project-image">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1100px) 52vw, (min-width: 768px) 80vw, 94vw"
          />
        </div>
      </motion.div>
      <span className="project-visual-note">실제 프로젝트 화면</span>
    </div>
  );
}
