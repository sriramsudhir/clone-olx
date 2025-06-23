import Link from 'next/link';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-9 md:gap-4">
      {categories.map((category) => (
        <Link href={`/listings?category=${category.slug}`} key={category.slug} className="group">
          <div className={cn(
            "flex flex-col items-center justify-center p-3 text-center aspect-square transition-all duration-200 group-hover:shadow-md rounded-xl",
            "bg-secondary/50 hover:bg-primary/5 dark:bg-secondary/10 dark:hover:bg-primary/10"
          )}>
            {category.icon && <category.icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />}
            <p className="text-xs font-medium mt-2 text-foreground/80 leading-tight">
              {category.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
