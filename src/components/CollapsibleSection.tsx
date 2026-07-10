import { useRef, useState, type ComponentType, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface IconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

interface Props {
  /** Anchor id — lets quick-nav chips scroll straight to this section. */
  id?: string;
  eyebrow?: string;
  title: string;
  /** One-line teaser shown on the collapsed face only. */
  subtitle?: string;
  icon?: ComponentType<IconProps>;
  /** Accent text class for the eyebrow + icon (e.g. "text-rust-600"). */
  accentClass?: string;
  defaultOpen?: boolean;
  /** Controlled mode — when provided, the parent owns open state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Smooth-scroll the section header into view when it opens. */
  scrollOnOpen?: boolean;
  children: ReactNode;
}

/**
 * A tappable, collapsed-by-default content section. The chapter page and
 * the Kids tab both pile a LOT of different material onto one screen —
 * folding everything but the essentials kills the endless scroll while
 * keeping each block one tap away. Children only mount while open, so
 * heavyweight content (maps, carousels) loads lazily on expand.
 */
export default function CollapsibleSection({
  id,
  eyebrow,
  title,
  subtitle,
  icon: Icon,
  accentClass = "text-terracotta-600/85",
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  scrollOnOpen = false,
  children
}: Props) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;
  const ref = useRef<HTMLElement>(null);

  const setOpen = (next: boolean) => {
    if (controlledOpen === undefined) setInternalOpen(next);
    onOpenChange?.(next);
    if (next && scrollOnOpen) {
      // Let the expand animation start so the header lands in place.
      window.setTimeout(() => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 160);
    }
  };

  return (
    <section
      ref={ref}
      id={id}
      className="rounded-2xl bg-cream-50 ring-1 ring-cream-300/70 overflow-hidden scroll-mt-24"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 sm:px-5 py-4 text-start cursor-pointer hover:bg-cream-100/60 active:bg-cream-200/50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          {Icon && (
            <span
              className={`shrink-0 w-9 h-9 rounded-full bg-cream-100 ring-1 ring-cream-300/70 flex items-center justify-center ${accentClass}`}
            >
              <Icon size={16} strokeWidth={1.8} />
            </span>
          )}
          <div className="min-w-0">
            {eyebrow && (
              <div
                className={`text-[10px] uppercase tracking-[0.24em] font-medium ${accentClass}`}
              >
                {eyebrow}
              </div>
            )}
            <h2 className="font-serif text-lg sm:text-xl text-ink-900 leading-tight">
              {title}
            </h2>
            {subtitle && !open && (
              <div className="mt-0.5 text-[12px] text-ink-700/60 truncate">
                {subtitle}
              </div>
            )}
          </div>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0 text-ink-700/50"
          aria-hidden
        >
          <ChevronDown size={18} strokeWidth={2} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-4 border-t border-cream-300/60">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
