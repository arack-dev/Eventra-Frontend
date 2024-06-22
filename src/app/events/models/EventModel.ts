import type { UserModel } from '@/app/user/models/UserModel'
import type { CategoryModel } from '@/app/events/models/CategoryModel'

export class EventModel {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: UserModel;
  categoryEvent: CategoryModel;
  url: string;

  constructor() {
    this.id = 1;
    this.title = 'Fictitious Event';
    this.description = 'This is a description of a fictitious event.';
    this.startDate = '2024-07-01T10:00:00';
    this.endDate = '2024-07-01T12:00:00';
    this.location = '';
    this.organizer = {
      userId: 1,
      firstName: '',
      lastName: '',
      email: '',
      typeOfUser: {
        typeId: 1,
        description: '',
      }
    } as UserModel;
    this.categoryEvent = {
      id: 1,
      name: '',
    } as CategoryModel;
    this.url = ""
  }
}
