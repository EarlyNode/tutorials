'use client';
import { useEffect } from 'react';
import type { ConnectedProps } from 'react-redux';
import { connect } from 'react-redux';

import { RootState } from '@/redux/store';

import { logout } from '../user-authentication/user-authentication-saga';
import {
  selectCurrentUsersName,
  selectUserProfilesAreLoading,
  selectUsersList,
} from '../user-profiles/user-profiles-reducer';
import { fetchUserProfiles } from '../user-profiles/user-profiles-saga';
import { DashBoardPageComponent } from './dashboard-page-component';

const mapStateToProps = (state: RootState) => ({
  currentUsersName: selectCurrentUsersName(state),
  isLoading: selectUserProfilesAreLoading(state),
  users: selectUsersList(state),
});

const mapDispatchToProps = {
  fetchUserProfiles,
  onLogout: logout,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type DashboardPagePropsFromRedux = ConnectedProps<typeof connector>;

function DashboardContainer({
  fetchUserProfiles,
  ...props
}: DashboardPagePropsFromRedux) {
  useEffect(() => {
    fetchUserProfiles();
  }, [fetchUserProfiles]);

  return <DashBoardPageComponent {...props} />;
}

export default connector(DashboardContainer);
