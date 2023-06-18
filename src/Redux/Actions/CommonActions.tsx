/* eslint-disable @typescript-eslint/no-unused-vars */
import loginKeys from '../Constants/LoginKeys';
import {commonKeys} from '../Constants/CommonKeys';

export const apiStart = () => ({
  type: commonKeys.API_START,
  payload: {},
});
