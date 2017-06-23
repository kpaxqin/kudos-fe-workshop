import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routerActions } from '../../shared/router';

import userStorage from '../storage/user';
import routes from '../../shared/constants/routes';
import { getFirstVisiblePath, checkPathVisible } from './navigation';

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
      return Promise.resolve(checkFn(props))
        .then(() => {
          this.setState({ authed: true });
        }, (e) => {
          console.log('Page you requested is not allowed: ', e);
        });
    }
    render() {
      const { authed } = this.state;
      return (
        authed ? <Content {...this.props} /> : null
      );
    }
  }

  return connect()(AuthCheck);
};

const checkLogin = props => userStorage.getUser()
  .then(data => data, (e) => {
    props.dispatch(routerActions.replace(routes.SIGN_IN));
    throw e;
  });

const checkPermission = props => checkLogin(props)
    .then((user) => {
      const isVisible = checkPathVisible(props.location.pathname, user.permissions);

      if (!isVisible) {
        const path = getFirstVisiblePath(user.permissions); // todo: Maybe forbidden page is better
        props.dispatch(routerActions.replace(path));
        throw new Error(`Please check user's permission.`);
      }
      return user;
    });

const connectCheckPermission = connectAuthCheck(checkPermission);

const connectCheckLogout = connectAuthCheck(props => userStorage.getUser()
  .then(() => {
    props.dispatch(routerActions.replace(routes.DASHBOARD));
    throw new Error('User has already logged in');
  }, () => {}));

const connectRedirectDefault = connectAuthCheck(
  (props) => {
    checkLogin(props).then((user) => {
      const path = getFirstVisiblePath(user.permissions);

      if (path) {
        return path;
      }
      return userStorage.removeUser().then(() => routes.SIGN_IN);
    }).then((path) => {
      props.dispatch(routerActions.replace(path));
    });
  },
);

export { connectCheckPermission, connectCheckLogout, connectRedirectDefault };

export default connectAuthCheck;

