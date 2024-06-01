import {BaseService} from "@/services/BaseService";
import type {BookingModel} from "@/models/BookingModel";

class BookingService extends BaseService<BookingModel>{
    constructor() {
        super('/reservations');
    }
}

export default new BookingService();