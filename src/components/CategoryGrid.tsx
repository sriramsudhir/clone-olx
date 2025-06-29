import Link from 'next/link';
import type { Category } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-9 md:gap-3 lg:gap-4">
      {categories.map((category) => (
        <Link href={`/listings?category=${category.slug}`} key={category.slug} className="group">
          <div className={cn(
            "flex flex-col items-center justify-center p-2 md:p-3 text-center aspect-square transition-all duration-200 group-hover:shadow-md rounded-lg md:rounded-xl",
            "bg-secondary/50 hover:bg-primary/5 dark:bg-secondary/10 dark:hover:bg-primary/10"
          )}>
            {category.icon && <category.icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-primary mb-1 md:mb-2" />}
            <p className="text-[10px] sm:text-xs md:text-sm font-medium text-foreground/80 leading-tight text-center">
              {category.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}