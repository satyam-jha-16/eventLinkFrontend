import { EventListResponse, EventResponse } from "@/types/event";
import { Api } from "./api";

async function createOne(name: string, location: string, date: string): Promise<EventResponse> {
  return Api.post("/event", {
    name,
    location,
    date
  })
}
async function updateOne(id: number, name: string, location: string, date: string): Promise<EventResponse> {
  return Api.put(`/event/${id}`, {
    name,
    location,
    date
  })
}
async function deleteOne(id: number): Promise<null> {
  return Api.delete(`/event/${id}`)
}
async function getOne(id: number): Promise<EventResponse> {
  return Api.get(`/event/${id}`)
}
async function getAll(): Promise<EventListResponse> {
  return Api.get("/event")
}
const eventService = {
  createOne,
  updateOne,
  deleteOne,
  getAll,
  getOne,
}

export { eventService };