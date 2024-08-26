import { APIResponse } from "./api";

export type EventResponse = APIResponse<Event>;
export type EventListResponse = APIResponse<Event[]>;

export type Event = {
  id : number;
  name : string;
  location : string;
  date : string;
  totalTicketsPurchased : number;
  totalTicketsEntered : number;
  createdAt : string;
  updatedAt : string;
}