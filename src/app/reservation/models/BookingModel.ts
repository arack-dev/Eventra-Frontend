import type {UserModel} from "@/app/user/models/UserModel";
import type {TicketModel} from "@/app/ticket/models/TicketModel";

export interface BookingModel {
    reservationId: number;
    user: UserModel;
    ticket: TicketModel;
    quantity: number;
    reservationDate:  string;
}