import { ApiBaseService } from '@/app/shared/services/ApiBaseService'
import type { EventModel } from '@/app/events/models/EventModel'

class EventService extends ApiBaseService<EventModel> {
  constructor() {
    super('/events')
  }
}

export default new EventService()
