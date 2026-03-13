"use client";

import { motion } from "framer-motion";

interface TechTagProps {
  label: string;
  index?: number;
}

export default function TechTag({ label, index = 0 }: TechTagProps) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-white border border-[#E5E5E5] rounded-full text-[#111111] hover:border-[#0066FF] hover:text-[#0066FF] transition-colors duration-200 cursor-default"
    >
      {label}
    </motion.span>
  );
}
