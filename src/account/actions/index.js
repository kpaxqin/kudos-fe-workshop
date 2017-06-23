import _ from 'lodash';
import { createAction, createAsyncAction } from 'redux-action-tools';
import { SubmissionError } from 'redux-form';

import auth from '../../shared/api/auth';
import userStorage from '../../shared/storage/user';
import routes from '../../shared/constants/routes';
import { push } from '../../shared/router';
import actionTypes from '../constants/actionTypes';

const signInAction = createAsyncAction(
  actionTypes.SIGN_IN,
  (signInUser, dispatch) => auth.signIn(signInUser)
    .then((data) => {
      const user = {
        ...data,
        permissions: _.flatten(data.staff.authorizations
          .map(authorization => authorization.role.permissions))
          .map(perm => perm.permissionType),
      };
      return userStorage.setUser(user);
    })
    .then(async (data) => {
      let nextPath;

      const stores = data.staff.authorizations
        .map(authorization => authorization.organization)
        .filter(org => org.type === 'STORE');
      if (stores.length >= 1) {
        if (stores.length === 1) {
          await userStorage.setCurrentStore(stores[0]);
          nextPath = routes.DASHBOARD;
        } else {
          nextPath = routes.STORE_SELECTOR;
        }
      } else {
        nextPath = routes.DASHBOARD;
      }
      dispatch(push(nextPath));
      return data;
    }, e => Promise.reject(new SubmissionError({ _error: e.message }))));

const ensureUser = createAction(actionTypes.ENSURE_USER);

const signOutAction = createAsyncAction(
  actionTypes.SIGN_OUT,
  (payload, dispatch) => userStorage.removeUser()
    .then(() => dispatch(push(routes.SIGN_IN))),
);

const selectStoreAction = createAsyncAction(
  actionTypes.SELECT_STORE,
  (aStore, dispatch) => userStorage.setCurrentStore(aStore)
    .then(() => dispatch(push(routes.DASHBOARD))),
);

export default {
  signInAction,
  ensureUser,
  signOutAction,
  selectStoreAction,
};
