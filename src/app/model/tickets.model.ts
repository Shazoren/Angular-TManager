export interface Ticket {
    id : string,
    title : string,
    date : string,
    description: string,
    isClosed: boolean,
    userID: string | null,
    clientID: string | null,
}