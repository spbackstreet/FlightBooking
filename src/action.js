import * as actions from './actionTypes';
import { Encrypt } from './commom/Encryption-Decryption';
import { postApiCall } from './commom/ApiRouter';

const performLoadingOperation = (payload) => {
  return {
    type: actions.LOADING_OPERATION,
    payload
  }
}

const fetchCommData = (payload) => {
  return {
    type: actions.FETCH_COMM_DATA,
    payload
  }
}

const fetchCommDetailData = (payload) => {
  return {
    type: actions.FETCH_COMM_DETAIL_DATA,
    payload
  }
}




export {
  performLoadingOperation, 
  fetchCommData,
  fetchCommDetailData
};
