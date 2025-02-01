import { Client } from "./client.model";

export interface Project {
    id : string,
    date : string,
    name : string,
    description: string,
    isClosed: boolean,
    clients: Client[],
}