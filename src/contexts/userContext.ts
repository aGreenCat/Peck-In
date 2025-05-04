import { createContext, Dispatch, SetStateAction } from "react";

export type User = {
	name: string;
	emplid: string;
	email: string;
};

export type UserContextType = {user: User | null, setUser: Dispatch<SetStateAction<User|null>>} | null

export const userContext = createContext<UserContextType>(null);