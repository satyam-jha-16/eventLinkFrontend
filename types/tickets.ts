import { APIResponse } from "./api";
import { Event } from "./event";

export type TicketResponse = APIResponse<Ticket>;
export type TicketListResponse = APIResponse<Ticket[]>;

export type Ticket = {
    id: number;
    event_id: number;
    user_id: number;
    event: Event;
    entered: boolean;
    created_at: string;
    updated_at: string;
}