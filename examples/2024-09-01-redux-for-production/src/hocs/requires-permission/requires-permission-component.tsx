interface Props<A, B> {
  NotPermittedComponent: React.ComponentType<A>;
  PermittedComponent: React.ComponentType<B>;
  isPermitted: boolean;
}

export const RequiresPermission = <A, B>(props: Props<A, B> & A & B) => {
  const { NotPermittedComponent, PermittedComponent, isPermitted } = props;

  return isPermitted ? (
    <PermittedComponent {...props} />
  ) : (
    <NotPermittedComponent {...props} />
  );
};
