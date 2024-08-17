import { connect } from 'react-redux';

import {
  getCurrentUsersEmail,
  loginSuccess,
  selectIsLoggedIn,
} from './user-profile';
import { UserProfileComponent } from './user-profile-component';

const mapStateToProps = state => ({
  email: getCurrentUsersEmail(state),
  isLoggedIn: selectIsLoggedIn(state),
});

const mapDispatchToProps = { onLoginClicked: loginSuccess };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserProfileComponent);
