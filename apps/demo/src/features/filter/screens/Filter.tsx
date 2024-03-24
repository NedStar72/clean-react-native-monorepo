import { useStepper } from '@packages/navigation';
import React from 'react';
import { Button, Text } from 'react-native';
import { FilterStep, FilterSteps } from '../../../app/steps';

export interface FilterProps {}

const Filter: React.FC<FilterProps> = () => {
  const stepper = useStepper<FilterSteps>();
  return (
    <>
      <Text>{'Filter'}</Text>
      <Button
        title={'navigate to address'}
        onPress={() => {
          stepper.step(FilterStep.filterAddress);
        }}
      />
      <Button
        title={'navigate to objectList'}
        onPress={() => {
          stepper.step(FilterStep.objectList);
        }}
      />
    </>
  );
};

export default Filter;
