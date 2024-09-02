'use client';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter } from '../../hocs/with-router';
import {
  loginClicked,
  selectIsLoading,
} from '../user-profiles/user-profile-reducer';
import { UserAuthenticationPageComponent } from './user-authentication-page-component';

const mapStateToProps = state => ({
  isLoading: selectIsLoading(state),
});

const mapDispatchToProps = {
  onLoginClicked: loginClicked,
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(UserAuthenticationPageComponent);
