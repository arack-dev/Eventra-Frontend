import {BaseService} from "@/services/BaseService";
import type {TicketModel} from "@/models/TicketModel";

class TicketService extends BaseService<TicketModel>{
    constructor() {
        super('/tickets');
    }
}

export default new TicketService();