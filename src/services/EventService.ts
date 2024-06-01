import { BaseService } from './BaseService';
import type {EventModel} from "@/models/EventModel";

class EventService extends BaseService<EventModel> {
    constructor() {
        super('/events');
    }
}

export default new EventService();