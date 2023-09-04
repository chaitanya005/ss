import { combineReducers } from 'redux';

import userReducer from './reducers/user';
// import userReducer from './user/user.reducer';

export default combineReducers({
  user: userReducer
});