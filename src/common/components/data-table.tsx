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
import { ChevronDown, Search } from 'lucide-react';

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
import { DatePickerDemo } from './ui/date-picker';
import { JalaliDatePicker } from './calendar/custom-date-picker';

interface DataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  isLoading?: boolean;
  paginationData: ReturnPagination;
  onSearch: (e: React.BaseSyntheticEvent) => void;
  searchValue?: string;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  paginationData,
  isLoading,
  onSearch,
  searchValue,
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
      <div className='flex items-center gap-4 mb-6'>
        <DataTableFilter table={table} />
        <DropdownMenu dir='rtl'>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              className='flex justify-center h-12 px-3 py-2 items-center gap-2'>
              تاریخ <ChevronDown />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='p-3 space-y-1'
            align='start'>
            <JalaliDatePicker />
          </DropdownMenuContent>
        </DropdownMenu>
        <DataTableInput
          value={searchValue ?? ''}
          onChange={(e) => onSearch(e)}
        />
      </div>
      <div className='border border-gray-200 rounded-md'>
        <Table>
          <TableHeader className='bg-gray-50/50'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className='border-b border-gray-200'>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='font-medium text-gray-700 py-3'>
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
                  className='h-24 text-center text-gray-500'>
                  در حال بارگذاری...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  className={`border-b border-gray-100 hover:bg-gray-50/70 transition-colors ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className='py-3 text-gray-800'>
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
                  className='h-24 text-center text-gray-500'>
                  نتیجه‌ای یافت نشد.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='mt-5 py-2 border-t border-gray-100'>
        <DataTablePagination
          table={table}
          paginationData={paginationData}
        />
      </div>
    </div>
  );
}

interface DataTableInputProps {
  value: string;
  onChange: (event: React.BaseSyntheticEvent) => void;
  placeholder?: string;
}

export function DataTableInput({
  value,
  onChange,
  placeholder = 'جستجو ...',
}: DataTableInputProps) {
  return (
    <div className='relative h-16 w-10/12'>
      <Search className='absolute left-3 top-[49%] -translate-y-1/2 h-4 w-4 text-muted-foreground' />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        className='pl-9 w-full'
      />
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
    <DropdownMenu dir='rtl'>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          className='flex justify-center h-12 px-3 py-2 items-center gap-2'>
          فیلتر جدول <ChevronDown />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='p-3 space-y-1'
        align='start'>
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
  );
}
