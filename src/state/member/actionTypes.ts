import { MemberType } from "../../../typings/form-data";

export const SAVE_MEMBER = 'user/SAVE_MEMBER';
export const REMOVE_MEMBER = 'user/REMOVE_MEMBER';

export interface SaveMemberAction {
  type: typeof SAVE_MEMBER
  payload: MemberType;
}

export interface RemoveMemberAction {
  type: typeof REMOVE_MEMBER;
}

export type UserActionTypes = SaveMemberAction | RemoveMemberAction;
