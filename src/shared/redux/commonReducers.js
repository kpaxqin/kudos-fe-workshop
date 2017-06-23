import { reducer as formReducer } from 'redux-form';

import { listReducer } from '../list';
import userReducer from '../../account/userReducer';
import { loadingReducer } from '../../shared/loadingAndError';

/*
 * Remove router reducer because we can access router info from history and location object;
 * and since lots of components are listening to redux store to re-render themselves,
 * the change of router reducer will cause lot of unnecessary re-render on page leave
 */
export default {
  form: formReducer,
  currentUser: userReducer,
  listView: listReducer,
  loading: loadingReducer,
  // router: routerReducer,
};

