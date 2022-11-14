import { AnyAction, combineReducers } from 'redux';
import currentUser, { State as UserState, initialState as currentUserInitialState } from '../state/user/reducer';

import { LOG_OUT } from '../state/actions';

export interface RootState {
  currentUser: UserState;
  
}

const appReducer = combineReducers({
  currentUser,
  
});

const rootReducer = (state: RootState, action: AnyAction) => {
  if (action.type === LOG_OUT) {
    console.log('Logging Out');
    return appReducer(
      {
        ...state,
        currentUser: currentUserInitialState,
      
      },
      action
    );
  }

  return appReducer(state, action);
};

export default rootReducer;
