import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import withLayout from './with-layout';

function MyComponent({ title = 'Hello' }) {
  return <p>{title}</p>;
}

describe('withLayout', () => {
  test('given a component: returns the component with a default title', () => {
    const WrappedComponent = withLayout()(MyComponent);

    render(<WrappedComponent />);

    expect(screen.getByText('Hello')).toHaveTextContent('Hello');
  });

  test('given a component: renders the layout around the component', () => {
    const WrappedComponent = withLayout()(MyComponent);

    render(<WrappedComponent />);

    expect(screen.getByRole('heading')).toHaveTextContent(/some title/i);
    expect(screen.getByRole('main')).toContainElement(
      screen.getByText('Hello'),
    );
    expect(screen.getByRole('contentinfo')).toHaveTextContent(/some footer/i);
  });

  test('given props for the wrapped component: passes on the props to the wrapped component', () => {
    const WrappedComponent = withLayout()(MyComponent);
    const customTitle = 'Custom Title';

    render(<WrappedComponent title={customTitle} />);

    expect(screen.getByText(customTitle)).toHaveTextContent(customTitle);
  });

  test('given used in composition with other HOCs: passes on the props of the other HOCs', () => {
    const compose =
      (...fns) =>
      x =>
        fns.reduceRight((y, f) => f(y), x);
    const withTitle = Component => props => (
      <Component title="foo" {...props} />
    );
    const ComposedComponent = compose(withLayout(), withTitle)(MyComponent);

    render(<ComposedComponent />);

    expect(screen.getByText('foo')).toHaveTextContent('foo');
  });

  test('given a component and NOT rendering the header: does NOT render the header', () => {
    const WrappedComponent = withLayout({ showHeader: false })(MyComponent);

    render(<WrappedComponent />);

    expect(screen.queryByRole('heading')).toBeNull();
  });
});
