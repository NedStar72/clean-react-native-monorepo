import React from 'react';
import { createStackCoordinator } from '@packages/navigation';
import { useLazyRef } from '@packages/react-utils';
import { FilterContainer } from '../containers';
import { FilterStep, FilterSteps, ObjectsStep } from '../steps';
import { Filter, FilterAddress } from '../../features/filter';
import ObjectsCoordinator from './ObjectsCoordinator';

const { Coordinator, Step, useStepComponent } = createStackCoordinator<FilterSteps>();

interface FilterCoordinatorProps {
  filterContainer: FilterContainer;
}

const FilterCoordinator: React.FC<FilterCoordinatorProps> = ({ filterContainer }) => {
  const ObjectsCoordinatorComponent = useStepComponent<FilterStep.objectList>(() => {
    const objectsContainer = useLazyRef(() => filterContainer.objectsContainer).current;
    return (
      <ObjectsCoordinator
        initialStep={ObjectsStep.objectList}
        objectsContainer={objectsContainer}
      />
    );
  });

  return (
    <Coordinator initialStep={FilterStep.filter}>
      <Step step={FilterStep.filter} component={Filter} />
      <Step step={FilterStep.filterAddress} component={FilterAddress} options={{ type: 'modal' }} />
      <Step step={FilterStep.objectList} component={ObjectsCoordinatorComponent} />
    </Coordinator>
  );
};

export default FilterCoordinator;
