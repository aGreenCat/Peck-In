import { Students } from "@/db/database";
import { createContext, Dispatch, SetStateAction } from "react";

export type User = Students;

export type UserContextType = {user: User | null, setUser: Dispatch<SetStateAction<User|null>>} | null

export const userContext = createContext<UserContextType>(null);