import Link from 'next/link';
import type { Category } from '@/lib/types';

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-9">
      {categories.map((category) => (
        <Link href={`/listings?category=${category.slug}`} key={category.slug} className="group">
          <div className="flex flex-col items-center justify-center p-3 text-center aspect-square transition-all duration-200 group-hover:shadow-md rounded-xl bg-card hover:bg-primary/5">
            {category.icon && <category.icon className="h-8 w-8 text-primary" />}
            <p className="text-xs font-medium mt-2 text-foreground/80">
              {category.name}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
