import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes (Animate UI / shadcn helper). */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
