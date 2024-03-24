import React from 'react';
import { createStackCoordinator } from '@packages/navigation';
import { useLazyRef } from '@packages/react-utils';
import { TicketsContainer } from '../containers';
import { CreateTicketStep, TicketsStep, TicketsSteps } from '../steps';
import CreateTicketCoordinator from './CreateTicketCoordinator';
import { TicketDetail, TicketList } from '../../features/tickets';

const { Coordinator, Step, useStepComponent } = createStackCoordinator<TicketsSteps>();

interface TicketsCoordinatorProps {
  ticketsContainer: TicketsContainer;
  initialStep: TicketsStep;
  initialParams?: TicketsSteps[TicketsStep]; // TODO: Беда
}

const TicketsCoordinator: React.FC<TicketsCoordinatorProps> = ({
  ticketsContainer,
  initialStep,
  initialParams,
}) => {
  const CreateTicketCoordinatorComponent = useStepComponent<TicketsStep.createTicket>(
    ({ type }) => {
      const createTicketContainer = useLazyRef(() =>
        ticketsContainer.createTicketContainer(type),
      ).current;
      return (
        <CreateTicketCoordinator
          initialStep={CreateTicketStep.createTicket}
          createTicketContainer={createTicketContainer}
        />
      );
    },
  );

  return (
    <Coordinator initialStep={initialStep} initialParams={initialParams}>
      <Step step={TicketsStep.ticketList} component={TicketList} />
      <Step step={TicketsStep.ticketDetail} component={TicketDetail} />
      <Step
        step={TicketsStep.createTicket}
        component={CreateTicketCoordinatorComponent}
        options={{ type: 'modal' }}
      />
    </Coordinator>
  );
};

export default TicketsCoordinator;
