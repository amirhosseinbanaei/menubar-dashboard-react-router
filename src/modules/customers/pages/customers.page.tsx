import { Payment, columns } from '../components/table-columns';
import { DataTable } from '../components/data-table';
import { ContentSection } from '@/common/components/content-section';
import { DataTableDemo } from '../components/test';

export default function CustomersPage() {
  const data: Payment[] = [
    {
      id: '728ed52f',
      amount: 100,
      status: 'pending',
      email: 'm@example.com',
    },
  ];

  return (
    <ContentSection title='باشگاه مشتریان'>
      <div className='container mx-auto py-10'>
        <DataTable
          columns={columns}
          data={data}
        />
      </div>
        <DataTableDemo />
    </ContentSection>
  );
}
