import UserKeys from "../Constants/UserKeys";

export const userDataApi = (data: any) => ({
  type: UserKeys.USER_DATA,
  payload: data,
});

export const saveUserDataApi = (data: any) => ({
  type: UserKeys.SAVE_USER_DATA,
  payload: data,
});

export const saveUserProfileImage = (data: any) => ({
  type: UserKeys.SAVE_PROFILE_IMAGE,
  payload: data,
});