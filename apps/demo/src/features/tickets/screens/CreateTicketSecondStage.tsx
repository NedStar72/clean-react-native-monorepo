import React from 'react';
import { Text } from 'react-native';

export interface CreateTicketSecondStageProps {
  type: string;
}

const CreateTicketSecondStage: React.FC<CreateTicketSecondStageProps> = ({ type }) => {
  return <Text>{`CreateTicketSecondStage: ${type}`}</Text>;
};

export default CreateTicketSecondStage;
