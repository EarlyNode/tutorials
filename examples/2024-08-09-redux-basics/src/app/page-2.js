'use client';

import { connect } from 'react-redux';

import { increment, selectCount } from './example-reducer';

function Home({ count, increment }) {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Redux Basics</h1>

      <div className="flex items-center justify-center space-x-4">
        <p className="text-2xl">Count: {count}</p>

        <button
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-white/90"
          onClick={() => {
            increment();
          }}
        >
          Increment
        </button>
      </div>
    </main>
  );
}

const mapStateToProps = state => ({ count: selectCount(state) });

const mapDispatchToProps = { increment };

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps, // from mapStateToProps
  ...dispatchProps, // from mapDispatchToProps
  ...ownProps, // passed in to the component wrapped by connect from its parent
});

connect(mapStateToProps, mapDispatchToProps, mergeProps);
