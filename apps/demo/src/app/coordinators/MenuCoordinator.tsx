import React, { useEffect } from 'react';
import { createStackCoordinator } from '@packages/navigation';
import { MenuContainer } from '../containers';
import { MenuStep, MenuSteps } from '../steps';
import { Menu } from '../../features/menu';

const { Coordinator, Step } = createStackCoordinator<MenuSteps>();

interface MenuCoordinatorProps {
  menuContainer: MenuContainer;
}

const MenuCoordinator: React.FC<MenuCoordinatorProps> = ({ menuContainer }) => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(menuContainer);
  }, []);

  return (
    <Coordinator initialStep={MenuStep.menu}>
      <Step step={MenuStep.menu} component={Menu} />
    </Coordinator>
  );
};

export default MenuCoordinator;
