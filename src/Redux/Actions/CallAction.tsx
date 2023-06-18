/* eslint-disable @typescript-eslint/no-unused-vars */
import loginKeys from '../Constants/LoginKeys';


export const callData = (data: any) => ({
  type: loginKeys.SAVE_CALL,
  payload: data,
});