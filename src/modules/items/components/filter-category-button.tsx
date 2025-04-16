'use client';
import { Button } from '@/common/components/ui';
import { cn } from '@/common/lib/utils';
import { Category } from '@/modules/categories/interfaces/category.interface';

export default function FilterCategoryButton({
  category,
  className,
  isSelected,
  ...props
}: React.ComponentProps<'button'> & {
  category: Category;
  isSelected: boolean;
}) {
  return (
    <Button
      className={cn(
        'px-4 py-2 rounded-sm hover:cursor-pointer text-sm flex gap-3 items-center',
        {
          'bg-secondary/70 text-foreground': !isSelected,
          'bg-primary text-primary-foreground': isSelected,
        },
        className,
      )}
      {...props}>
      <div className='aspect-square w-8 relative rounded'>
        <img
          src={`${category.image}`}
          className='w-full h-full rounded'
          alt=''
        />
      </div>
      {category.translations[0].name}
    </Button>
  );
}
