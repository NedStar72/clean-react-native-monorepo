const prefix = 'tabbar';

export enum TabBarStep {
  filter = `${prefix}/filter`,
  tickets = `${prefix}/tickets`,
  shows = `${prefix}/shows`,
  calendar = `${prefix}/calendar`,
  menu = `${prefix}/menu`,
}

export type TabBarSteps = {
  [TabBarStep.filter]: never;
  [TabBarStep.tickets]: never;
  [TabBarStep.shows]: never;
  [TabBarStep.calendar]: never;
  [TabBarStep.menu]: never;
};
