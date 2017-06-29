import React from 'react';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import { withRedux } from '../../shared/redux';

const World = ({ currentUser }) => <div>World of {currentUser.name}!</div>;

const enhance = flowRight([
  withRedux(),
  connect(state => state),
]);

export default enhance(World);
