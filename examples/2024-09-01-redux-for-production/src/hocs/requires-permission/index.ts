'use client';
import { curry } from 'ramda';
import { connect } from 'react-redux';

import { RootState } from '@/redux/store';

import { RequiresPermission } from './requires-permission-component';

function requiresPermission(
  NotPermittedComponent: React.ComponentType,
  selector: (state: RootState) => boolean,
  PermittedComponent: React.ComponentType,
) {
  const mapStateToProps = (state: RootState) => ({
    NotPermittedComponent,
    PermittedComponent,
    isPermitted: selector(state),
  });

  return connect(mapStateToProps)(RequiresPermission);
}

export default curry(requiresPermission);
