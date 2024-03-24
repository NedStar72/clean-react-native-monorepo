import React from 'react';
import { createStackCoordinator } from '@packages/navigation';
import { CreateTicketContainer } from '../containers';
import { CreateTicketStep, CreateTicketSteps } from '../steps';
import { CreateTicket, CreateTicketSecondStage } from '../../features/tickets';

const { Coordinator, Step, useStepComponent } = createStackCoordinator<CreateTicketSteps>();

interface CreateTicketCoordinatorProps {
  createTicketContainer: CreateTicketContainer;
  initialStep: CreateTicketStep;
  initialParams?: CreateTicketSteps[CreateTicketStep];
}

const CreateTicketCoordinator: React.FC<CreateTicketCoordinatorProps> = ({
  createTicketContainer,
  initialStep,
  initialParams,
}) => {
  const CreateTicketComponent = useStepComponent<CreateTicketStep.createTicket>(() => {
    return <CreateTicket type={createTicketContainer.type} />;
  });

  const CreateTicketSecondStageComponent = useStepComponent<CreateTicketStep.createTicket>(() => {
    return <CreateTicketSecondStage type={createTicketContainer.type} />;
  });

  return (
    <Coordinator initialStep={initialStep} initialParams={initialParams}>
      <Step step={CreateTicketStep.createTicket} component={CreateTicketComponent} />
      <Step
        step={CreateTicketStep.createTicketSecondStage}
        component={CreateTicketSecondStageComponent}
      />
    </Coordinator>
  );
};

export default CreateTicketCoordinator;
