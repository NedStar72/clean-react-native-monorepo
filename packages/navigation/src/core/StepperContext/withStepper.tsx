import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { StepperContextProvider, StepperContextProviderProps } from './StepperContextProvider';

function withStepper(stepperContextProps: StepperContextProviderProps) {
  return <Props extends object>(WrappedComponent: React.ComponentType<Props>) => {
    const TargetComponent: React.FC<Props> = props => {
      return (
        <StepperContextProvider {...stepperContextProps}>
          <WrappedComponent {...props} />
        </StepperContextProvider>
      );
    };
    TargetComponent.displayName = `withStepper(${
      WrappedComponent.displayName || WrappedComponent.name
    })`;
    hoistNonReactStatics(TargetComponent, WrappedComponent);
    return TargetComponent;
  };
}

export default withStepper;
