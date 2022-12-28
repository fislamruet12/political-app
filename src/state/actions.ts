import user from './user/actions';
import member from './member/actions'
export const LOG_OUT = 'LOG_OUT';

export interface LogOutAction {
  type: typeof LOG_OUT;
}

const logOut = (): LogOutAction => ({
  type: LOG_OUT
});

const actions = {
  user,
  member
};

export default actions;
