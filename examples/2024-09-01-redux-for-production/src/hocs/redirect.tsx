import { useRouter } from 'next/navigation';
import { curry } from 'ramda';
import { PropsWithChildren, useEffect } from 'react';
import type { ConnectedProps } from 'react-redux';
import { connect } from 'react-redux';

import { RootState } from '@/redux/store';

function redirect(predicate: (state: RootState) => boolean, path: string) {
  const isExternal = path.startsWith('http');

  const mapStateToProps = (
    state: RootState,
  ): { shouldRedirect: boolean } & Record<string, any> => ({
    shouldRedirect: predicate(state),
  });

  const connector = connect(mapStateToProps);

  return function <T>(
    Component: React.ComponentType<Omit<T, 'shouldRedirect'>>,
  ) {
    function Redirect({
      shouldRedirect,
      ...props
    }: PropsWithChildren<T & ConnectedProps<typeof connector>>): JSX.Element {
      const router = useRouter();

      useEffect(() => {
        if (shouldRedirect) {
          if (isExternal && window) {
            window.location.assign(path);
          } else {
            router.push(path);
          }
        }
      }, [shouldRedirect, router]);

      return <Component {...props} />;
    }

    return connector(Redirect);
  };
}

export default curry(redirect);
