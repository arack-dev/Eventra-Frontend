import {BaseService} from "@/app/shared/services/BaseService";
import type {TicketModel} from "@/app/ticket/models/TicketModel";

class TicketService extends BaseService<TicketModel>{
    constructor() {
        super('/tickets');
    }
}

export default new TicketService();