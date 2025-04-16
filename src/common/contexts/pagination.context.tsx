import { createContext, useContext, ReactNode, useState, useCallback, useMemo } from 'react';

export const DOTS = '...';

interface PaginationContextType {
  // Current state
  currentPage: number;
  pageSize: number;
  totalCount: number;
  siblingCount: number;
  
  // Pagination range
  paginationRange: (string | number)[];
  totalPageCount: number;
  
  // Actions
  nextPage: () => void;
  previousPage: () => void;
  changePage: (page: number) => void;
  setPageSize: (size: number) => void;
  updatePagination: (data: { totalCount: number; pageSize?: number }) => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

// Default pagination values
const DEFAULT_PAGINATION_DATA = {
  totalCount: 0,
  pageSize: 10,
  siblingCount: 1,
  currentPage: 1,
};

interface PaginationProviderProps {
  children: ReactNode;
  initialData?: Partial<typeof DEFAULT_PAGINATION_DATA>;
}

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export function PaginationProvider({ children, initialData }: PaginationProviderProps) {
  const [currentPage, setCurrentPage] = useState(initialData?.currentPage ?? DEFAULT_PAGINATION_DATA.currentPage);
  const [pageSize, setPageSize] = useState(initialData?.pageSize ?? DEFAULT_PAGINATION_DATA.pageSize);
  const [totalCount, setTotalCount] = useState(initialData?.totalCount ?? DEFAULT_PAGINATION_DATA.totalCount);
  const [siblingCount] = useState(initialData?.siblingCount ?? DEFAULT_PAGINATION_DATA.siblingCount);

  const totalPageCount = Math.ceil(totalCount / pageSize);

  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

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
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }

    return [];
  }, [totalCount, pageSize, siblingCount, currentPage, totalPageCount]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPageCount]);

  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const changePage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPageCount) {
      setCurrentPage(page);
    }
  }, [totalPageCount]);

  const updatePagination = useCallback((data: { totalCount: number; pageSize?: number }) => {
    if (data.pageSize) {
      setPageSize(data.pageSize);
    }
    setTotalCount(data.totalCount);
    setCurrentPage(1); // Reset to first page when data changes
  }, []);

  const contextValue: PaginationContextType = {
    currentPage,
    pageSize,
    totalCount,
    siblingCount,
    paginationRange,
    totalPageCount,
    nextPage,
    previousPage,
    changePage,
    setPageSize,
    updatePagination,
  };

  return (
    <PaginationContext.Provider value={contextValue}>
      {children}
    </PaginationContext.Provider>
  );
}

export function usePaginationContext() {
  const context = useContext(PaginationContext);
  if (context === undefined) {
    throw new Error('usePaginationContext must be used within a PaginationProvider');
  }
  return context;
}