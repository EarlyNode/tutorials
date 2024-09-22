import { compose } from '@reduxjs/toolkit';

import withAuth from './with-auth';
import withLoading from './with-loading';

export default compose(withLoading, withAuth);
