import React, { Component } from 'react';
import userStorage from './storage/user';
import history from '../history';

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

export const connectCheckLogin = connectAuthCheck(
  () => userStorage.getUser().then(user => user, (e) => {
    history.push('/sign-in');
    throw e;
  }),
);

export default connectAuthCheck;
