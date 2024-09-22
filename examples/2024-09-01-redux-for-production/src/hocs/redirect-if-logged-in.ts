import { selectIsAuthenticated } from '@/features/user-profiles/user-profiles-reducer';

import redirect from './redirect';

export default redirect(selectIsAuthenticated);
