export interface EventRequestModel {
  title: string;
  description: string;
  startDate: string | Date;
  endDate: string | Date;
  location: string;
  organizerId: number;
  categoryId: number;
  url: string;
}