import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

export type StepType = 'default' | 'modal' | 'fullScreenModal' | 'overlay' | 'tab';

export interface StackStepOptions {
  type?: StepType;
}

function getPresentation(
  stepType: StepType,
): NativeStackNavigationOptions['presentation'] | undefined {
  switch (stepType) {
    case 'modal':
      return 'modal';
    case 'fullScreenModal':
      return 'fullScreenModal';
    case 'overlay':
    default:
      return undefined;
  }
}

export function createNavigationOptions(
  stepOptions?: StackStepOptions,
): NativeStackNavigationOptions {
  const presentation = getPresentation(stepOptions?.type ?? 'default');
  return { presentation, headerShown: presentation !== 'modal' };
}
