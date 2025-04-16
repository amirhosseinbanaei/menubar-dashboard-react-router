import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { cn } from '@/common/lib/utils';
import { SortableItem } from './sortable-item';

type Direction = 'vertical' | 'horizontal' | 'grid';

interface DragDropProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (
    item: T,
    dragHandleProps: {
      'data-drag-handle': boolean;
      'aria-label': string;
      tabIndex: number;
      onKeyDown: (e: React.KeyboardEvent) => void;
      onMouseDown: (e: React.MouseEvent) => void;
      onTouchStart: (e: React.TouchEvent) => void;
    },
    isDragging: boolean,
    index: number,
  ) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  disabled?: boolean;
  direction?: Direction;
  gridColumns?: number;
}

export function DragDrop<T extends { id: string | number }>({
  items,
  onChange,
  renderItem,
  className,
  itemClassName,
  disabled = false,
  direction = 'vertical',
  gridColumns = 3,
}: DragDropProps<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(items, oldIndex, newIndex);
      onChange(newItems);
    }
  };

  const getSortingStrategy = () => {
    switch (direction) {
      case 'horizontal':
        return horizontalListSortingStrategy;
      case 'grid':
        return rectSortingStrategy;
      default:
        return verticalListSortingStrategy;
    }
  };

  const getContainerClassName = () => {
    switch (direction) {
      case 'horizontal':
        return 'flex flex-row gap-2 overflow-x-auto';
      case 'grid':
        return `grid gap-2 grid-cols-${gridColumns}`;
      default:
        return 'flex flex-col gap-2';
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}>
      <SortableContext
        items={items}
        strategy={getSortingStrategy()}>
        <div className={cn(getContainerClassName(), className)}>
          {items.map((item, index) => (
            <SortableItem
              key={item.id}
              id={item.id}
              className={itemClassName}
              disabled={disabled}>
              {({ dragHandleProps, isDragging }) =>
                renderItem(item, dragHandleProps, isDragging, index)
              }
            </SortableItem>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
