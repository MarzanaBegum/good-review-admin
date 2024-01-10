import { atom } from "jotai";

export type AdminStateType = {
    _id: string;
    name: string;
    email: string;
    profile: string;
};

export const ADMIN_STATE = atom<AdminStateType | undefined>(undefined);
