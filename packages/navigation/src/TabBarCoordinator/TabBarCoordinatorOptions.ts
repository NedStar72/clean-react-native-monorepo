import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

export interface TabBarCoordinatorOptions {}

export function createTabNavigatorNavigationOptions(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  coordinatorOptions?: TabBarCoordinatorOptions,
): BottomTabNavigationOptions {
  return { headerShown: false };
}
