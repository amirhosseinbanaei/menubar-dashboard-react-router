import { ContentSection } from '@/common/components/content-section';
import { useOrders } from '../hooks/use-orders';
import { orderColumns } from '../components/table-columns';
import { DataTable } from '@/common/components/data-table';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import usePagination from '@/common/hooks/usePagination';
import { useDebounce } from '@/common/hooks/useDebounce';

function OrdersTable() {
  const paginationData = usePagination({
    initialData: {
      pageIndex: 0,
      pageSize: 10,
    },
    siblingCount: 1,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);

  const page = paginationData.pagination.pageIndex + 1;
  const limit = paginationData.pagination.pageSize;

  const { data, isLoading } = useOrders({
    page,
    limit,
    search: debouncedSearch,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      paginationData.setTotalCount(data.meta.total);
    }
  }, [data]);

  const handleSearch = (e: BaseSyntheticEvent) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  return (
    <DataTable
      data={data?.data || []}
      isLoading={isLoading}
      columns={orderColumns}
      paginationData={paginationData}
      onSearch={handleSearch}
      searchValue={searchTerm}

    />
  );
}

export default function OrdersPage() {
  return (
    <ContentSection title='لیست سفارشات'>
      <OrdersTable />
    </ContentSection>
  );
}
