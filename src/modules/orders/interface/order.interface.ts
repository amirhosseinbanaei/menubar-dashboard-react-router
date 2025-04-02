import { OrderStatus } from '../enums/order-status.enum';
import { PaymentType } from '../enums/payment-type-enum';

export interface Order {
  id: number;

  total_amount: number;

  discount_amount: number;

  final_amount: number;

  status: OrderStatus;

  payment_type: PaymentType;

  scheduled_pickup_time: Date;

  items: {
    id: number;
    quantity: number;
    price: number;
    extra_items: {
      id: number;
      quantity: number;
      price: number;
    }[];
  }[];

  user: {
    id: number;
    full_name: string;
    phone_number: string;
  };

  restaurant: {
    id: number;
    name: string;
  };
  created_at: Date;
  updated_at: Date;
}
