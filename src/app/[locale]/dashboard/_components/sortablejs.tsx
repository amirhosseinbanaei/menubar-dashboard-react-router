"use client";
import DemoCard from "./demo-card";
import { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import useLocalStorage from "@/hooks/useLocalStorage";
import { SortTableListInterface } from "@/ts/interfaces/sortableList.interface";

const SortableList = (props: SortTableListInterface) => {
  const { sortList, sortListType, shouldSort, mutateFn } = props;
  const [reactSortableList, setReactSortableList] = useState<any>([]);
  const [_, setOrderNumber] = useLocalStorage("OrderNumber", 0);
  useEffect(() => {
    if (
      !reactSortableList.length ||
      sortList.length !== reactSortableList.length
    ) {
      setReactSortableList(sortList);
      setOrderNumber(sortList.length + 1);
    }
  }, [sortList, reactSortableList, setOrderNumber]);

  const onSortHandler = async (sortable: any) => {
    switch (sortListType) {
      case "product":
        mutateFn([
          sortable.oldIndex + sortList[0].order - 1,
          sortable.newIndex + sortList[0].order - 1,
        ]);
        break;
      default:
        mutateFn([sortable.oldIndex, sortable.newIndex]);
        break;
    }
  };

  return (
    <ReactSortable
      className="flex h-auto w-auto flex-shrink-0 flex-col gap-5 bg-transparent md:w-full md:min-w-[700px]"
      handle=".test"
      animation={300}
      swapThreshold={1}
      {...(!shouldSort ? { disabled: true } : { disabled: false })}
      list={reactSortableList}
      setList={setReactSortableList}
      onSort={(sortable) => onSortHandler(sortable)}
    >
      {reactSortableList.map((item: { _id: string }, index: number) => {
        return (
          <DemoCard
            key={item._id}
            index={index}
            cardData={item}
            shouldSort={shouldSort}
            cardType={sortListType}
          />
        );
      })}
    </ReactSortable>
  );
};

export default SortableList;
