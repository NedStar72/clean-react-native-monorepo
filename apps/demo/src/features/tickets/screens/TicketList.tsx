import { useStepper } from '@packages/navigation';
import React from 'react';
import { Button, Text } from 'react-native';
import { TicketsStep, TicketsSteps } from '../../../app/steps';

export interface TicketListProps {}

const TicketList: React.FC<TicketListProps> = () => {
  const stepper = useStepper<TicketsSteps>();
  return (
    <>
      <Text>{'TicketList'}</Text>
      <Button
        title={'navigate to detail'}
        onPress={() => {
          stepper.step(TicketsStep.ticketDetail, { id: 'ticketID' });
        }}
      />
      <Button
        title={'navigate to createTicket'}
        onPress={() => {
          stepper.step(TicketsStep.createTicket, { type: 'ticketType' });
        }}
      />
    </>
  );
};

export default TicketList;
