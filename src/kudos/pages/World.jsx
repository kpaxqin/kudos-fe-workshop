import React from 'react';
import { connect } from 'react-redux';
import { withRedux } from '../../shared/redux';

const World = ({ currentUser }) => <div>World of {currentUser.name}!</div>;

export default withRedux()(connect(state => state)(World));
