const prefix = 'shows';

export enum ShowsStep {
  showList = `${prefix}/showList`,
}

export type ShowsSteps = {
  [ShowsStep.showList]: never;
};
