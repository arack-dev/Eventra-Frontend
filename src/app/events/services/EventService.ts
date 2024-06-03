import { BaseService } from '@/app/shared/services/BaseService';
import type {EventModel} from "@/app/events/models/EventModel";

class EventService extends BaseService<EventModel> {
    constructor() {
        super('/events');
    }
}

export default new EventService();