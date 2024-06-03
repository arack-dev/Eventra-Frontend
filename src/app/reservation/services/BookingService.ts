import {BaseService} from "@/app/shared/services/BaseService";
import type {BookingModel} from "@/app/reservation/models/BookingModel";

class BookingService extends BaseService<BookingModel>{
    constructor() {
        super('/reservations');
    }
}

export default new BookingService();