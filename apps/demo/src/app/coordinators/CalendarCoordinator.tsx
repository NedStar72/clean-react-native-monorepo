import React, { useEffect } from 'react';
import { createStackCoordinator } from '@packages/navigation';
import { CalendarContainer } from '../containers';
import { CalendarStep, CalendarSteps } from '../steps';
import { Calendar } from '../../features/calendar';

const { Coordinator, Step } = createStackCoordinator<CalendarSteps>();

interface CalendarCoordinatorProps {
  calendarContainer: CalendarContainer;
}

const CalendarCoordinator: React.FC<CalendarCoordinatorProps> = ({ calendarContainer }) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(calendarContainer);
  }, []);

  return (
    <Coordinator initialStep={CalendarStep.calendar}>
      <Step step={CalendarStep.calendar} component={Calendar} />
    </Coordinator>
  );
};

export default CalendarCoordinator;
