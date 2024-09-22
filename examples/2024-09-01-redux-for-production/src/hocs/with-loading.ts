'use client';
import AppLoading from '@/features/app-loading/app-loading-container';
import { selectAppFinishedLoading } from '@/features/app-loading/app-loading-reducer';

import requiresPermission from './requires-permission';

export default requiresPermission(AppLoading, selectAppFinishedLoading);
