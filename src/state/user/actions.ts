import * as Types from './actionTypes';
import { User } from '../../../typings/structures';

const saveUser = (user: User): Types.SaveUserAction => ({
  type: Types.SAVE_USER,
  payload: user
});

const removeUser = (): Types.RemoveUserAction => ({
  type: Types.REMOVE_USER
});

export default { saveUser, removeUser };
