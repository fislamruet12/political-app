import { AnyAction, combineReducers } from 'redux';
import currentUser, { State as UserState, initialState as currentUserInitialState } from '../state/user/reducer';
import currentMember, { State as MemberState, initialState as currentMemberInitialState } from '../state/member/reducer';

import { LOG_OUT } from '../state/actions';

export interface RootState {
  currentUser: UserState;
  currentMember:MemberState
}

const appReducer = combineReducers({
  currentUser,
  currentMember,
});

const rootReducer = (state: RootState, action: AnyAction) => {
  if (action.type === LOG_OUT) {
    console.log('Logging Out');
    return appReducer(
      {
        ...state,
        currentUser: currentUserInitialState,
        currentMember:currentMemberInitialState
      },
      action
    );
  }

  return appReducer(state, action);
};

export default rootReducer;
