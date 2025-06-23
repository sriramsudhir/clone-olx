import type { SubCategory } from "@/lib/types";
import Link from "next/link";
import { cn } from "@/lib/utils";

type SubCategoryNavProps = {
  subCategories: SubCategory[];
  currentCategorySlug: string;
  activeSubCategorySlug: string;
};

export default function SubCategoryNav({
  subCategories,
  currentCategorySlug,
  activeSubCategorySlug,
}: SubCategoryNavProps) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-4">
      {subCategories.map((sub) => (
        <Link
          href={`/listings?category=${currentCategorySlug}&subCategory=${sub.slug}`}
          key={sub.slug}
          className="group"
          scroll={false}
        >
          <div
            className={cn(
              "flex flex-col items-center justify-center p-3 text-center aspect-square transition-all duration-200 group-hover:shadow-md rounded-xl",
              sub.slug === activeSubCategorySlug
                ? "bg-primary/10 border-2 border-primary"
                : "bg-secondary/50 hover:bg-primary/5 dark:bg-secondary/10 dark:hover:bg-primary/10 border-2 border-transparent"
            )}
          >
            {sub.icon && <sub.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />}
            <p className="text-xs font-medium mt-2 text-foreground/80 leading-tight">
              {sub.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
