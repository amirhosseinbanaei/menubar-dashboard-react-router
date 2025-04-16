import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TanstackTable,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/common/components/ui';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/common/components/ui/dropdown-menu';
import { Input } from '@/common/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/common/components/ui/table';
import { ReturnPagination } from '../hooks/usePagination';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/common/components/ui/pagination';

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
  paginationData: ReturnPagination;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  paginationData,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { pagination } = paginationData;
  const defaultData = React.useMemo(() => [], []);

  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    manualPagination: true,
    pageCount: paginationData.totalPageCount,
    onPaginationChange: paginationData.setPagination,
  });

  return (
    <div className='w-full'>
      <div className='flex items-center '>
        <DataTableFilter table={table} />
        <Input
          placeholder='جستجو...'
          value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('id')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  در حال بارگذاری...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='py-3'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'>
                  نتیجه‌ای یافت نشد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='pt-8 py-4'>
        <DataTablePagination
          table={table}
          paginationData={paginationData}
        />
      </div>
    </div>
  );
}

interface DataTablePaginationProps<TData> {
  table: TanstackTable<TData>;
  paginationData: ReturnPagination;
}

export function DataTablePagination<TData>({
  table,
  paginationData,
}: DataTablePaginationProps<TData>) {
  if (!paginationData) return null;
  const { currentPage, range, totalPageCount } = paginationData;
  return (
    <Pagination className='flex justify-end'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${currentPage === 1 && 'opacity-40'}`}
            onClick={() => table.previousPage()}
            aria-disabled={!table.getCanPreviousPage()}
          />
        </PaginationItem>
        {range?.map((pageNumber) => {
          console.log(pageNumber);
          if (typeof pageNumber !== 'number') {
            return (
              <PaginationItem key={'DOTS'}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                className='px-5'
                onClick={() => table.setPageIndex(pageNumber - 1)}
                {...{ isActive: currentPage === pageNumber }}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            className={`${currentPage === totalPageCount && 'opacity-40'}`}
            onClick={() => table.nextPage()}
            aria-disabled={!table.getCanNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

interface DataTableFilterProps<TData> {
  table: TanstackTable<TData>;
}

export function DataTableFilter<TData>({ table }: DataTableFilterProps<TData>) {
  return (
    <div className='flex items-center justify-between'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='flex justify-center items-center gap-2'>
            Filter <ChevronDown />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className='p-3 space-y-1'
          align='end'>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>تعداد ردیف ها</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className='mx-5'>
                {[1, 2, 3, 10, 20, 30, 40, 50].map((pageSize) => (
                  <DropdownMenuCheckboxItem
                    key={pageSize}
                    className='capitalize'
                    checked={table.getState().pagination.pageSize === pageSize}
                    onCheckedChange={() => table.setPageSize(pageSize)}>
                    {pageSize}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>فیلتر ستون ها</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className='capitalize'
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }>
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
