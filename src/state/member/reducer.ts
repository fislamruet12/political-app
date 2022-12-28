import produce from 'immer';
import * as Types from './actionTypes';

import { MemberType } from '../../../typings/form-data';

export type State = {
  member: MemberType | null;
};

export const initialState: State = {
  member: null
};

export default (state: State = initialState, action: Types.UserActionTypes) =>
  produce(state, (draft: State) => {
    switch (action.type) {
      case Types.SAVE_MEMBER:
        draft.member = action.payload;
        break;
      case Types.REMOVE_MEMBER:
        draft.member = null;
        break;
    }
  });
