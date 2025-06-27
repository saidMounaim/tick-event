export interface EventTypes {
  id: string;
  title: string;
  description: string;
  tickets: number;
  price: number;
  date: Date;
  location: string | null;
  featuredImage: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  isFeatured: boolean;
}
