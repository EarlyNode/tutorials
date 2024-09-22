'use client';
import UserAuthentication from '@/features/user-authentication/user-authentication-container';
import { selectIsAuthenticated } from '@/features/user-profiles/user-profiles-reducer';

import requiresPermission from './requires-permission';

export default requiresPermission(UserAuthentication, selectIsAuthenticated);
