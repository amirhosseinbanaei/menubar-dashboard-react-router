export interface Admin {
  id: number;
  full_name: string;
  email: string;
  restaurant_id: number;
  phone_number: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}