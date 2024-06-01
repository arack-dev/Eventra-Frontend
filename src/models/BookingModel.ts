import type {UserModel} from "@/models/UserModel";
import type {TicketModel} from "@/models/TicketModel";

export interface BookingModel {
    reservationId: number;
    user: UserModel;
    ticket: TicketModel;
    quantity: number;
    reservationDate:  string;
}