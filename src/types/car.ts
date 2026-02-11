export interface Car {
  id: number;
  title: string;
  subtitle?: string | null;
  images: string[];
  price?: number | null;
  brand?: string | null;
  model?: string | null;
  year?: number | null;
  mileage?: number | null;
  transmission?: string | null;
  engine?: string | null;
  fuel_type?: string | null;
  color?: string | null;
  description?: string | null;
  createdAt?: string | null;
  views?: number | null;
}
