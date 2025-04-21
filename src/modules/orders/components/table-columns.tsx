import { Badge } from '@/common/components/ui';
import { numberFormatter } from '@/common/utils/number-formatter';
import { ColumnDef } from '@tanstack/react-table';
import { Order } from '../interface/order.interface';
import { OrderStatus } from '../enums/order-status.enum';

const statusColors = {
  [OrderStatus.PENDING]: 'bg-yellow-500',
  [OrderStatus.CONFIRMED]: 'bg-blue-500',
  [OrderStatus.PREPARING]: 'bg-purple-500',
  [OrderStatus.READY]: 'bg-orange-500',
  [OrderStatus.COMPLETED]: 'bg-green-500',
  [OrderStatus.CANCELLED]: 'bg-red-500',
};

const statusLabels = {
  [OrderStatus.PENDING]: 'در انتظار پرداخت',
  [OrderStatus.CONFIRMED]: 'تایید شده',
  [OrderStatus.PREPARING]: 'در حال آماده سازی',
  [OrderStatus.READY]: 'آماده',
  [OrderStatus.COMPLETED]: 'تکمیل شده',
  [OrderStatus.CANCELLED]: 'لغو شده',
};

export type OrderValue =
  | string
  | number
  | OrderStatus
  | Order['items'][0]
  | Order['items'][0]['extra_items'][0];

export const orderColumns: ColumnDef<Order, OrderValue>[] = [
  {
    accessorKey: 'id',
    header: 'شناسه سفارش',
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    cell: ({ row }) => {
      const status = row.getValue('status') as OrderStatus;
      return (
        <Badge className={statusColors[status]}>{statusLabels[status]}</Badge>
      );
    },
  },
  {
    accessorKey: 'payment_type',
    header: 'نوع پرداخت',
    cell: ({ row }) => {
      const paymentType = row.getValue('payment_type') as Order['payment_type'];
      return paymentType === 'cash' ? 'نقدی' : 'کارت';
    },
  },
  {
    accessorKey: 'scheduled_pickup_time',
    header: 'زمان تحویل',
    cell: ({ row }) => {
      const date = new Date(row.getValue('scheduled_pickup_time'));
      const time = Intl.DateTimeFormat('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
      return time;
    },
  },
  {
    accessorKey: 'items',
    header: 'تعداد آیتم‌ها',
    cell: ({ row }) => {
      const items = row.getValue('items') as Order['items'];
      return items.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  {
    accessorKey: 'total_amount',
    header: 'مبلغ کل',
    cell: ({ row }) => {
      const amount = row.getValue('total_amount') as number;
      return numberFormatter(amount);
    },
  },
  {
    accessorKey: 'table_number',
    header: 'شماره میز',
    cell: ({ row }) => {
      const tableNumber = row.getValue('table_number') as number;
      return tableNumber || '-';
    },
  },
  {
    accessorKey: 'discount_amount',
    header: 'تخفیف',
    cell: ({ row }) => {
      const amount = row.getValue('discount_amount') as number;
      return numberFormatter(amount);
    },
  },
  {
    accessorKey: 'final_amount',
    header: 'مبلغ نهایی',
    cell: ({ row }) => {
      const amount = row.getValue('final_amount') as number;
      return numberFormatter(amount);
    },
  },
  {
    accessorKey: 'date',
    header: 'تاریخ',
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const dateStr = new Intl.DateTimeFormat('fa-IR', {
        month: 'long',
        day: 'numeric',
      }).format(date);
      return dateStr;
    },
  },
  {
    accessorKey: 'time',
    header: 'ساعت',
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      const time = Intl.DateTimeFormat('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(date);
      return time;
    },
  },
];
