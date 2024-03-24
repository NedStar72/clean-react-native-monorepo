import { useStepper } from '@packages/navigation';
import React from 'react';
import { Button, Text } from 'react-native';
import { ObjectsStep, ObjectsSteps } from '../../../app/steps';

export interface ObjectListProps {}

const ObjectList: React.FC<ObjectListProps> = () => {
  const stepper = useStepper<ObjectsSteps>();
  return (
    <>
      <Text>{'ObjectList'}</Text>
      <Button
        title={'navigate to detail'}
        onPress={() => {
          stepper.step(ObjectsStep.objectDetail, { id: 'objectID' });
        }}
      />
    </>
  );
};

export default ObjectList;
