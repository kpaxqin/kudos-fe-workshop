import React, { Component } from 'react';
import { flowRight } from 'lodash';
import { connect } from 'react-redux';
import Dashboard from '../../shared/dashboard';
import { withRedux } from '../../shared/redux';
import userStorage from '../../shared/storage/user';

const connectAuthCheck = checkFn => (Content) => {
  class AuthCheck extends Component {
    constructor() {
      super();
      this.state = {
        authed: false,
      };
    }
    componentWillMount() {
      this.doCheck(this.props);
    }
    doCheck(props) {
      Promise.resolve(checkFn(props))
        .then(() => {
          this.setState({ authed: true });
        }, (e) => {
          console.warn('Page you requested is not allowed: ', e);
        });
    }
    render() {
      const { authed } = this.state;
      return (
        authed ? <Content {...this.props} /> : null
      );
    }
  }

  return AuthCheck;
};


const World = ({ currentUser }) => <Dashboard><div>World of {currentUser.name}!</div></Dashboard>;

const enhance = flowRight([
  connectAuthCheck(() => userStorage.getUser()),
  withRedux(),
  connect(state => state),
]);

export default enhance(World);
