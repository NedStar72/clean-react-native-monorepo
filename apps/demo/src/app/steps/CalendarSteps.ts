const prefix = 'calendar';

export enum CalendarStep {
  calendar = `${prefix}/calendar`,
}

export type CalendarSteps = {
  [CalendarStep.calendar]: never;
};
