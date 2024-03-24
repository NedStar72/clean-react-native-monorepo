import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ConfigContextProvider } from './ConfigContextProvider';

function withConfig() {
  return <Props extends object>(WrappedComponent: React.ComponentType<Props>) => {
    const TargetComponent: React.FC<Props> = props => {
      return (
        <ConfigContextProvider>
          <WrappedComponent {...props} />
        </ConfigContextProvider>
      );
    };
    TargetComponent.displayName = `withConfig(${
      WrappedComponent.displayName || WrappedComponent.name
    })`;
    hoistNonReactStatics(TargetComponent, WrappedComponent);
    return TargetComponent;
  };
}

export default withConfig;
