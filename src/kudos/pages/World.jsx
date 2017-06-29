import React from 'react';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import Dashboard from '../../shared/dashboard';
import { withRedux } from '../../shared/redux';

const World = ({ currentUser }) => <Dashboard><div>World of {currentUser.name}!</div></Dashboard>;

const enhance = flowRight([
  withRedux(),
  connect(state => state),
]);

export default enhance(World);
