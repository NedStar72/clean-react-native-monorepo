import React, { useEffect } from 'react';
import { createStackCoordinator } from '@packages/navigation';
import { ShowsContainer } from '../containers';
import { ShowsStep, ShowsSteps } from '../steps';
import { ShowList } from '../../features/shows';

const { Coordinator, Step } = createStackCoordinator<ShowsSteps>();

interface ShowsCoordinatorProps {
  showsContainer: ShowsContainer;
}

const ShowsCoordinator: React.FC<ShowsCoordinatorProps> = ({ showsContainer }) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(showsContainer);
  }, []);

  return (
    <Coordinator initialStep={ShowsStep.showList}>
      <Step step={ShowsStep.showList} component={ShowList} />
    </Coordinator>
  );
};

export default ShowsCoordinator;
