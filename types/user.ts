import { APIResponse } from "./api";

export enum UserRole {
	Attendee = "attendee",
	Manager = "manager",
}

export type AuthResponse = APIResponse<{ token: string; user: User }>;

export type User = {
  id: number;
	email: string;
  role: UserRole;
	createdAt: string;
	updatedAt: string;
}