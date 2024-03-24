import React, { useEffect } from 'react';
import { createNestedStackCoordinator } from '@packages/navigation';
import { ObjectsContainer } from '../containers';
import { ObjectsStep, ObjectsSteps } from '../steps';
import { ObjectDetail, ObjectList } from '../../features/objects';

const { Coordinator, Step } = createNestedStackCoordinator<ObjectsSteps>();

interface ObjectsCoordinatorProps {
  objectsContainer: ObjectsContainer;
  initialStep: ObjectsStep;
  initialParams?: ObjectsSteps[ObjectsStep];
}

const ObjectsCoordinator: React.FC<ObjectsCoordinatorProps> = ({
  objectsContainer,
  initialStep,
  initialParams,
}) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(objectsContainer);
  }, []);

  return (
    <Coordinator initialStep={initialStep} initialParams={initialParams}>
      <Step step={ObjectsStep.objectList} component={ObjectList} />
      <Step step={ObjectsStep.objectDetail} component={ObjectDetail} />
    </Coordinator>
  );
};

export default ObjectsCoordinator;
