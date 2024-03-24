import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

function inject<Props, InjectedProps extends keyof Props>(
  WrappedComponent: React.ComponentType<Props>,
  injectorProps: Pick<Props, InjectedProps>,
) {
  const TargetComponent = (props: Omit<Props, InjectedProps>) => {
    return <WrappedComponent {...(props as Props)} {...injectorProps} />;
  };
  TargetComponent.displayName = `inject(${WrappedComponent.displayName || WrappedComponent.name})`;
  hoistNonReactStatics(TargetComponent, WrappedComponent);
  return TargetComponent;
}

export default inject;
