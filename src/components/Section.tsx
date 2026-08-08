import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  id: string;
  eyebrow: string;
  title: string;
  /** A short italic subtitle shown right under the headline */
  kicker?: string;
  intro?: string;
  children: ReactNode;
  toned?: boolean;
  /** When true, headline + intro center themselves */
  center?: boolean;
}

export default function Section({
  id,
  title,
  intro,
  children
}: Props) {
  return (
    <section id={id} className="relative py-8 sm:py-12 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-5 sm:mb-7 max-w-3xl"
        >
          <h2 className="section-title">{title}</h2>
          {intro && (
            <p className="mt-2 text-[14px] sm:text-base text-ink-700/80 leading-relaxed">
              {intro}
            </p>
          )}
        </motion.header>
        {children}
      </div>
    </section>
  );
}
