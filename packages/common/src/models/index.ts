import { LinkModel } from '../../../backend/src/db/';

export interface LinkPayload {
    id: number;
    url: string;
    text: string;
    isActive: boolean;
    position: number;
    userId: number;
}

export interface AppUserPayload {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    links?: LinkPayload[];
}

