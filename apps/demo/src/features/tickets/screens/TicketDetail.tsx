import React from 'react';
import { Text } from 'react-native';

export interface TicketDetailProps {
  id: string;
}

const TicketDetail: React.FC<TicketDetailProps> = ({ id }) => {
  return <Text>{`TicketDetail: ${id}`}</Text>;
};

export default TicketDetail;
