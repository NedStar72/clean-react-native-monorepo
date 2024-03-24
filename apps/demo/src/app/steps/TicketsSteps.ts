const prefix = 'tickets';

export enum TicketsStep {
  ticketList = `${prefix}/ticketList`,
  ticketDetail = `${prefix}/ticketDetail`,
  createTicket = `${prefix}/createTicket`,
}

export type TicketsSteps = {
  [TicketsStep.ticketList]: never;
  [TicketsStep.ticketDetail]: { id: string };
  [TicketsStep.createTicket]: { type: string };
};
