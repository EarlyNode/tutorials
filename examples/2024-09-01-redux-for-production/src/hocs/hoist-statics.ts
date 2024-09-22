import hoistNonReactStatics from 'hoist-non-react-statics';

type HOC<InnerProps, OuterProps = InnerProps> = (
  Component: React.ComponentType<InnerProps>,
) => React.ComponentType<OuterProps>;

const hoistStatics =
  <InnerProps, OuterProps>(
    higherOrderComponent: HOC<InnerProps, OuterProps>,
  ): HOC<InnerProps, OuterProps> =>
  (BaseComponent: React.ComponentType<InnerProps>) => {
    const NewComponent = higherOrderComponent(BaseComponent);
    hoistNonReactStatics(NewComponent, BaseComponent);
    return NewComponent;
  };

export default hoistStatics;
