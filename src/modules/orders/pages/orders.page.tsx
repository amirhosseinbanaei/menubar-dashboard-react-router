import { ContentSection } from '@/common/components/content-section';
import { useOrders } from '../hooks/use-orders';
import { orderColumns } from '../components/table-columns';
import { DataTable } from '@/common/components/data-table';
import { PaginationProvider } from '@/common/contexts/pagination.context';
import { useEffect } from 'react';
import usePagination from '@/common/hooks/usePagination';

function OrdersTable() {
  const paginationData = usePagination({
    initialData: {
      pageIndex: 0,
      pageSize: 3,
    },
    siblingCount: 1
  });

  const { data, isLoading } = useOrders({
    page: paginationData.pagination.pageIndex + 1,
    limit: paginationData.pagination.pageSize,
  });

  useEffect(() => {
    if (data?.meta) {
      paginationData.setTotalCount(data.meta.total);
    }
  }, [data]);

  if (!data) return null;

  return (
    <DataTable
      data={data.data}
      isLoading={isLoading}
      columns={orderColumns}
      paginationData={paginationData}
    />
  );
}

export default function OrdersPage() {
  return (
    <ContentSection title='لیست سفارشات'>
      <PaginationProvider>
        <OrdersTable />
      </PaginationProvider>
    </ContentSection>
  );
}
