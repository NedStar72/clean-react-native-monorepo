const prefix = 'createTicket';

export enum CreateTicketStep {
  createTicket = `${prefix}/createTicket`,
  createTicketSecondStage = `${prefix}/createTicketSecondStage`,
}

export type CreateTicketSteps = {
  [CreateTicketStep.createTicket]: never;
  [CreateTicketStep.createTicketSecondStage]: never;
};
