import React from 'react';
import { createTabBarCoordinator } from '@packages/navigation';
import { useLazyRef } from '@packages/react-utils';
import { RootContainer } from '../containers';
import { TabBarStep, TabBarSteps, TicketsStep } from '../steps';
import FilterCoordinator from './FilterCoordinator';
import TicketsCoordinator from './TicketsCoordinator';
import ShowsCoordinator from './ShowsCoordinator';
import CalendarCoordinator from './CalendarCoordinator';
import MenuCoordinator from './MenuCoordinator';

const { Coordinator, Step, useStepComponent } = createTabBarCoordinator<TabBarSteps>();

interface TabBarCoordinatorProps {
  rootContainer: RootContainer;
}

const TabBarCoordinator: React.FC<TabBarCoordinatorProps> = ({ rootContainer }) => {
  const FilterCoordinatorComponent = useStepComponent<TabBarStep.filter>(() => {
    const filterContainer = useLazyRef(() => rootContainer.filterContainer).current;
    return <FilterCoordinator filterContainer={filterContainer} />;
  });

  const TicketsCoordinatorComponent = useStepComponent<TabBarStep.filter>(() => {
    const ticketsContainer = useLazyRef(() => rootContainer.ticketsContainer).current; // TODO: оставить хук в хуке?
    return (
      <TicketsCoordinator
        initialStep={TicketsStep.ticketList}
        ticketsContainer={ticketsContainer}
      />
    );
  });

  const ShowsCoordinatorComponent = useStepComponent<TabBarStep.filter>(() => {
    const showsContainer = useLazyRef(() => rootContainer.showsContainer).current;
    return <ShowsCoordinator showsContainer={showsContainer} />;
  });

  const CalendarCoordinatorComponent = useStepComponent<TabBarStep.filter>(() => {
    const calendarContainer = useLazyRef(() => rootContainer.calendarContainer).current;
    return <CalendarCoordinator calendarContainer={calendarContainer} />;
  });

  const MenuCoordinatorComponent = useStepComponent<TabBarStep.filter>(() => {
    const menuContainer = useLazyRef(() => rootContainer.menuContainer).current;
    return <MenuCoordinator menuContainer={menuContainer} />;
  });

  return (
    <Coordinator initialStep={TabBarStep.filter}>
      <Step step={TabBarStep.filter} component={FilterCoordinatorComponent} />
      <Step step={TabBarStep.tickets} component={TicketsCoordinatorComponent} />
      <Step step={TabBarStep.shows} component={ShowsCoordinatorComponent} />
      <Step step={TabBarStep.calendar} component={CalendarCoordinatorComponent} />
      <Step step={TabBarStep.menu} component={MenuCoordinatorComponent} />
    </Coordinator>
  );
};

export default TabBarCoordinator;
