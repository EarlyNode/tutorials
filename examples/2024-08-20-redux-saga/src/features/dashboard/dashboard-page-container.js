'use client';
import { connect } from 'react-redux';

import { selectCurrentUsersEmail } from '../user-profiles/user-profile-reducer';
import { DashboardPageComponent } from './dashboard-page-component';

const mapStateToProps = state => ({
  currentUsersEmail: selectCurrentUsersEmail(state),
});

export default connect(mapStateToProps)(DashboardPageComponent);
