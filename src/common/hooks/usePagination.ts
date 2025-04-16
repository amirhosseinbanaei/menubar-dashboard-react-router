import { PaginationState } from '@tanstack/react-table';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';

export const DOTS = '...';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export interface PaginationData {
  siblingCount?: number;
  // paginationState?: [
  //   PaginationState,
  //   Dispatch<SetStateAction<PaginationState>>,
  // ];
  initialData: PaginationState;
}

export interface ReturnPagination {
  currentPage: number;
  totalPageCount: number;
  pagination: PaginationState;
  range: (string | number)[] | undefined;
  setTotalCount: Dispatch<SetStateAction<number>>;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
}

const usePagination = ({
  siblingCount = 1,
  // paginationState,
  initialData,
}: PaginationData): ReturnPagination => {
  const [pagination, setPagination] = useState<PaginationState>(
    initialData || {
      pageIndex: 0,
      pageSize: 2,
    },
  );

  const [totalCount, setTotalCount] = useState<number>(pagination.pageSize);

  const currentPage = pagination.pageIndex + 1;

  const totalPageCount = Math.ceil(totalCount / pagination.pageSize);

  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 3;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pagination.pageSize, siblingCount, currentPage]);

  return {
    range: paginationRange,
    pagination,
    setPagination,
    currentPage,
    setTotalCount,
    totalPageCount,
  };
};

export default usePagination;
