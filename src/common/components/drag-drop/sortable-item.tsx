import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { cn } from '@/common/lib/utils';

interface SortableItemProps {
  id: string | number;
  children: (props: {
    dragHandleProps: {
      'data-drag-handle': boolean;
      'aria-label': string;
      tabIndex: number;
      onKeyDown: (e: React.KeyboardEvent) => void;
      onMouseDown: (e: React.MouseEvent) => void;
      onTouchStart: (e: React.TouchEvent) => void;
    };
    isDragging: boolean;
  }) => React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export function SortableItem({
  id,
  children,
  className,
  disabled = false,
}: SortableItemProps) {
  const { listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id, disabled });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(className, {
        'opacity-50': isDragging,
      })}>
      {children({
        dragHandleProps: {
          'data-drag-handle': true,
          'aria-label': 'Drag handle',
          tabIndex: 0,
          ...listeners,
        },
        isDragging,
      })}
    </div>
  );
}
