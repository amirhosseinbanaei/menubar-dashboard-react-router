import { ContentSection } from '@/common/components/content-section';
import { OrdersTable } from '../components/test';
import { useOrders } from '../hooks/use-orders';
import { OrderTableColumns } from '../components/table-columns';

export default function OrdersPage() {
  const { data } = useOrders();
  console.log(data)
  return (
    <ContentSection title='لیست سفارشات'>
      {data && (
        <OrdersTable
          data={data}
          columns={OrderTableColumns}
        />
      )}
    </ContentSection>
  );
}
