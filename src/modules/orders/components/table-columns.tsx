import { Badge } from "@/common/components/ui";
import { numberFormatter } from "@/common/utils/number-formatter";
import { ColumnDef } from "@tanstack/react-table";

interface OrderItem {
  id: number;
  price: number;
  quantity: number;
  extra_items: {
    id: number;
    price: number;
    quantity: number;
  }[];
}

interface User {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

interface Restaurant {
  id: number;
  name: string;
  address: string;
}

interface Order {
  id: number;
  total_amount: string;
  discount_amount: string;
  final_amount: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  payment_type: 'cash' | 'card';
  scheduled_pickup_time: string;
  items: OrderItem[];
  user: User;
  restaurant: Restaurant;
  created_at: string;
  updated_at: string;
}

const statusColors = {
  pending: 'bg-yellow-500',
  processing: 'bg-blue-500',
  completed: 'bg-green-500',
  cancelled: 'bg-red-500',
};

export const OrderTableColumns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'شناسه سفارش',
  },
  {
    accessorKey: 'status',
    header: 'وضعیت',
    cell: ({ row }) => {
      const status = row.getValue('status') as Order['status'];
      return (
        <Badge className={statusColors[status]}>
          {status === 'pending' && 'در انتظار پرداخت'}
          {status === 'processing' && 'در حال پردازش'}
          {status === 'completed' && 'تکمیل شده'}
          {status === 'cancelled' && 'لغو شده'}
        </Badge>
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
        second: '2-digit',
      }).format(date);
      return time;
    },
  },
  {
    accessorKey: 'items',
    header: 'تعداد آیتم‌ها',
    cell: ({ row }) => {
      const items = row.getValue('items') as OrderItem[];
      return items.reduce((acc, item) => acc + item.quantity, 0);
    },
  },
  {
    accessorKey: 'total_amount',
    header: 'مبلغ کل',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('total_amount'));
      return numberFormatter(amount);
    },
  },
  {
    accessorKey: 'discount_amount',
    header: 'تخفیف',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('discount_amount'));
      return numberFormatter(amount);
    },
  },
  {
    accessorKey: 'final_amount',
    header: 'مبلغ نهایی',
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('final_amount'));
      return numberFormatter(amount);
    },
  },
  {
    accessorKey: 'created_at',
    header: 'تاریخ',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      const dateStr = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
      return dateStr;
    },
  },
  {
    accessorKey: 'created_at',
    header: 'ساعت',
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      const time = Intl.DateTimeFormat('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).format(date);
      return time;
    },
  },
];
