import type { UserModel } from '@/app/user/models/UserModel'
import type { CategoryModel } from '@/app/events/models/CategoryModel'

export class EventModel {
  id: number;
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: UserModel;
  categoryEvent: CategoryModel;

  constructor() {
    this.id = 1;
    this.title = 'Fictitious Event';
    this.description = 'This is a description of a fictitious event.';
    this.image = 'https://via.placeholder.com/150';
    this.startDate = '2024-07-01T10:00:00';
    this.endDate = '2024-07-01T12:00:00';
    this.location = '123 Fictitious Street, Imaginary City, Fictionland';
    this.organizer = {
      userId: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      typeOfUser: {
        typeId: 1,
        description: 'Admin',
      }
    } as UserModel;
    this.categoryEvent = {
      id: 1,
      name: 'Fiction Category',
    } as CategoryModel;
  }
}
