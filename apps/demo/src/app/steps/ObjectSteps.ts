const prefix = 'objects';

export enum ObjectsStep {
  objectList = `${prefix}/objectList`,
  objectDetail = `${prefix}/objectDetail`,
}

export type ObjectsSteps = {
  [ObjectsStep.objectList]: never;
  [ObjectsStep.objectDetail]: { id: string };
};
