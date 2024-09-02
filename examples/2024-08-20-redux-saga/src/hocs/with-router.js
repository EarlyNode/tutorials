'use client';
import { useRouter } from 'next/navigation';

export const withRouter = Component => {
  function WithRouter(props) {
    const router = useRouter();

    return <Component {...props} router={router} />;
  }

  return WithRouter;
};
