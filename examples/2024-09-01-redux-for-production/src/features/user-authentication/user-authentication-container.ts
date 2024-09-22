'use client';
import type { ConnectedProps } from 'react-redux';
import { connect } from 'react-redux';

import { RootState } from '@/redux/store';

import { UserAuthenticationComponent } from './user-authentication-component';
import { login, selectIsAuthenticating } from './user-authentication-reducer';

const mapStateToProps = (state: RootState) => ({
  isLoading: selectIsAuthenticating(state),
});

const mapDispatchToProps = { onLogin: login };

const connector = connect(mapStateToProps, mapDispatchToProps);

export type UserAuthenticationPropsFromRedux = ConnectedProps<typeof connector>;

export default connector(UserAuthenticationComponent);
