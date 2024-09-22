'use client';
import { compose } from 'redux';

import UserAuthentication from '@/features/user-authentication/user-authentication-container';
import withPublicPage from '@/hocs/public-page';
import redirectIfLoggedIn from '@/hocs/redirect-if-logged-in';

export default compose(
  redirectIfLoggedIn('/dashboard'),
  withPublicPage,
)(UserAuthentication);
