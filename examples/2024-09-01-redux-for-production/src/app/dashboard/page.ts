'use client';
import DashboardPage from '@/features/dashboard/dashboard-page-container';
import authenticatedPage from '@/hocs/authenticated-page';

export default authenticatedPage(DashboardPage);
