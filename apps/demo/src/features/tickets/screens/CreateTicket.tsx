import { useStepper } from '@packages/navigation';
import React from 'react';
import { Button, Text } from 'react-native';
import { CreateTicketStep, CreateTicketSteps } from '../../../app/steps';

export interface CreateTicketProps {
  type: string;
}

const CreateTicket: React.FC<CreateTicketProps> = ({ type }) => {
  const stepper = useStepper<CreateTicketSteps>();
  return (
    <>
      <Text>{`CreateTicket: ${type}`}</Text>
      <Button
        title={'navigate to second stage'}
        onPress={() => {
          stepper.step(CreateTicketStep.createTicketSecondStage);
        }}
      />
    </>
  );
};

export default CreateTicket;
