import type { SubCategory } from "@/lib/types";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "../ui/button";

type SubCategoryNavProps = {
  subCategories: SubCategory[];
  currentCategorySlug: string;
  activeSubCategorySlug: string;
  mode: "vertical" | "horizontal";
};

export default function SubCategoryNav({
  subCategories,
  currentCategorySlug,
  activeSubCategorySlug,
  mode,
}: SubCategoryNavProps) {
  
  const NavItem = ({ sub }: { sub: SubCategory }) => (
    <Link
      href={`/listings?category=${currentCategorySlug}&subCategory=${sub.slug}`}
      className={cn(
        "flex items-center gap-3 rounded-lg transition-colors text-foreground/80",
        "p-3",
        sub.slug === activeSubCategorySlug
          ? "bg-primary/10 text-primary font-semibold"
          : "hover:bg-accent/50 hover:text-foreground"
      )}
      scroll={false}
    >
      {sub.icon && <sub.icon className="h-5 w-5 shrink-0 text-primary/80" />}
      <span className="text-sm">{sub.name}</span>
    </Link>
  );

  const HorizontalNavItem = ({ sub }: { sub: SubCategory }) => (
     <Button
        asChild
        variant={sub.slug === activeSubCategorySlug ? "default" : "secondary"}
        size="sm"
        className="shrink-0 rounded-lg"
    >
        <Link
            href={`/listings?category=${currentCategorySlug}&subCategory=${sub.slug}`}
            scroll={false}
            className="flex items-center gap-2"
        >
            {sub.icon && <sub.icon className="h-4 w-4" />}
            {sub.name}
        </Link>
    </Button>
  );

  if (mode === "horizontal") {
    return (
      <ScrollArea className="w-full whitespace-nowrap py-2 border-b md:border-none">
        <div className="flex w-max space-x-2 px-4">
          {subCategories.map((sub) => (
            <HorizontalNavItem key={sub.slug} sub={sub} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    );
  }

  return (
    <nav className="flex flex-col space-y-1 pr-2">
      {subCategories.map((sub) => (
        <NavItem key={sub.slug} sub={sub} />
      ))}
    </nav>
  );
}
