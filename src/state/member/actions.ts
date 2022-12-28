import { MemberType } from '../../../typings/form-data';
import * as Types from './actionTypes';

const saveMember = (user:MemberType): Types.SaveMemberAction => ({
  type: Types.SAVE_MEMBER,
  payload: user
});

const removeMember = (): Types.RemoveMemberAction => ({
  type: Types.REMOVE_MEMBER
});

export default { saveMember, removeMember };
