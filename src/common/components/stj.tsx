import { ReactNode } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { cn } from '../lib/utils';

interface SortableListProps<T> {
  name: string;
  items: T[];
  setItems: (newItems: T[]) => void;
  setSortEnd: (status: boolean) => void;
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
}

export const SortableList = <T extends { id: string | number }>({
  name,
  items,
  setItems,
  setSortEnd,
  renderItem,
  className = '',
}: SortableListProps<T>) => {
  return (
    <ReactSortable
      handle='.sort-handle'
      animation={300}
      swapThreshold={1}
      list={items}
      setList={setItems}
      className={cn(className)}
      onEnd={() => setSortEnd(true)}>
      {items.map((item, index) => {
        return <span key={`${name}-${index}`}>{renderItem(item, index)}</span>;
      })}
    </ReactSortable>
  );
};
