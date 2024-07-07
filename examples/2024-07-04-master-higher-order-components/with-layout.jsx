import { Layout } from './layout';

export default ({ showHeader = true } = {}) =>
  Component =>
  props => (
    <Layout showHeader={showHeader}>
      <Component {...props} />
    </Layout>
  );
