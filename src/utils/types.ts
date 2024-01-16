export type Byke = {
  id: string;
  name: string;
  type: string;
  color: string;
  wheel_size: string;
  price: number;
  status: Status;
  description: string;
}

export type Status = 'available' | 'busy' | 'unavailable';
