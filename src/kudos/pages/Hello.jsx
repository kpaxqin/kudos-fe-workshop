import React from 'react';
import { flowRight } from 'lodash';
import { withRedux } from '../../shared/redux';
import { layoutWrapper } from '../../shared/dashboard';

const Hello = () => (
  <div>Hello</div>
);

const decorator = flowRight([
  withRedux(),
  layoutWrapper,
]);

export default decorator(Hello);
