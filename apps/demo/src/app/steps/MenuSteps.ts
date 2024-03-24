const prefix = 'menu';

export enum MenuStep {
  menu = `${prefix}/menu`,
}

export type MenuSteps = {
  [MenuStep.menu]: never;
};
