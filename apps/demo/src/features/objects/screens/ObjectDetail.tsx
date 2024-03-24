import React from 'react';
import { Text } from 'react-native';

export interface ObjectDetailProps {
  id: string;
}

const ObjectDetail: React.FC<ObjectDetailProps> = ({ id }) => {
  return <Text>{`ObjectDetail: ${id}`}</Text>;
};

export default ObjectDetail;
