import * as actions from './actionTypes';
import { Encrypt } from './commom/Encryption-Decryption';
import { postApiCall } from './commom/ApiRouter';

const performLoadingOperation = (payload) => {
  return {
    type: actions.LOADING_OPERATION,
    payload
  }
}

const storeCustomerCircle = (payload) => {
  return {
    type: actions.STORE_CUSTOMER_CIRCLE,
    payload
  }
}

const storeCustomerDelivery = (payload) => {
  return {
    type: actions.STORE_CUSTOMER_DELIVERY,
    payload
  }
}

const storeCustomerNumber = (payload) => {
  return {
    type: actions.STORE_CUSTOMER_NUMBER,
    payload
  }
}








export {
  performLoadingOperation, 
  storeCustomerCircle,
  storeCustomerDelivery,
  storeCustomerNumber
};
