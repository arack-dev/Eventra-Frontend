import { ApiBaseService } from '@/app/shared/services/ApiBaseService'
import type { BookingModel } from '@/app/reservation/models/BookingModel'

class BookingService extends ApiBaseService<BookingModel> {
  constructor() {
    super('/reservations')
  }
}

export default new BookingService()
