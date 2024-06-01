import type {EventModel} from "@/models/EventModel";

export interface TicketModel {
    ticketId: number;
    event: EventModel;
    price: number;
    totalAvailable: number;
    category: number;
    description: string;
}