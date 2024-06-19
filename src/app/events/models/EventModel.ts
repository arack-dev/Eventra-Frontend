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
    this.id = 0;
    this.title = '';
    this.description = '';
    this.image = '';
    this.startDate = '';
    this.endDate = '';
    this.location = '';
    this.organizer = {
      userId: 0,
      firstName: '',
      lastName: '',
      email: '',
      typeOfUser: null,
    } as UserModel;
    this.categoryEvent = {
      id: 0,
      name: '',
    } as CategoryModel;
  }
}