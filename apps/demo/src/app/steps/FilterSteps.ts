const prefix = 'filter';

export enum FilterStep {
  filter = `${prefix}/filter`,
  filterAddress = `${prefix}/filterAddress`,
  objectList = `${prefix}/objectList`,
}

export type FilterSteps = {
  [FilterStep.filter]: never;
  [FilterStep.filterAddress]: never;
  [FilterStep.objectList]: never;
};
