import { ApiBaseService } from '@/app/shared/services/ApiBaseService'
import type { TicketModel } from '@/app/ticket/models/TicketModel'

class TicketService extends ApiBaseService<TicketModel> {
  constructor() {
    super('/tickets')
  }
}

export default new TicketService()
