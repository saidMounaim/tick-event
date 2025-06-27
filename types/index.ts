/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EventTypes {
  id: string;
  title: string;
  description: string;
  tickets: number;
  price: any;
  date: any;
  location: string | null;
  featuredImage: string | null;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  isFeatured?: boolean;
}
export interface AdditionalImage {
  id: string;
  url: string;
  eventId: string;
}
export interface EventWithImages extends EventTypes {
  additionalImages: AdditionalImage[] | null;
}
