'use client';
import { useEffect } from 'react';
import type { ConnectedProps } from 'react-redux';
import { connect } from 'react-redux';

import { AppLoadingComponent } from './app-loading-component';
import { loadApp } from './app-loading-saga';

const mapDispatchToProps = { loadApp };

const connector = connect(undefined, mapDispatchToProps);

type AppLoadingPropsFromRedux = ConnectedProps<typeof connector>;

function AppLoadingContainer({ loadApp }: AppLoadingPropsFromRedux) {
  useEffect(() => {
    loadApp();
  }, [loadApp]);

  return <AppLoadingComponent />;
}

export default connector(AppLoadingContainer);
