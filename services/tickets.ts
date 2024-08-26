import { Ticket, TicketListResponse, TicketResponse } from "@/types/tickets";
import { Api } from "./api";
import { APIResponse } from "@/types/api";

async function createOne(event_id: number): Promise<TicketResponse> {
    return Api.post("/ticket", { event_id });
}

async function getOne(id: number): Promise<APIResponse<{ ticket: Ticket, qrcode: string }>> {
    return Api.get(`/ticket/${id}`);
}

async function getAll(): Promise<TicketListResponse> {
    return Api.get("/ticket");
}

async function validateOne(ticket_id: number, ownerId: number): Promise<TicketResponse> {
    return Api.post("/ticket/validate", { ticket_id, ownerId });
}

const ticketService = {
    createOne,
    getOne,
    getAll,
    validateOne,
}

export { ticketService }