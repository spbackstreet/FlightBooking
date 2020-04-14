import * as actions from './actionTypes';
import { Encrypt } from './commom/Encryption-Decryption';
import { postApiCall } from './commom/ApiRouter';

const storeCustomerPOAcapture = (payload) => {
  return {
    type: actions.STORE_CUSTOMER_POA_CAPTURE,
    payload
  }
}

const storeCustomerCapture = (payload) => {
  return {
    type: actions.STORE_CUSTOMER_CAPTURE,
    payload
  }
}

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

const storeCustomerPermanent = (payload) => {
  return {
    type: actions.STORE_CUSTOMER_PERMANENT,
    payload
  }
}

const storeCustomerNumber = (payload) => {
  return {
    type: actions.STORE_CUSTOMER_NUMBER,
    payload
  }
}

const storeCustomerCircleHeader = (payload) => {
  return {
    type: actions.STORE_CUSTOMER_CIRCLE_HEADER,
    payload
  }
}


const storeCustomerPOImage = (payload) => {
  return {
    type: actions.STORE_CUSTOMER_POI_IMAGE,
    payload
  }
}

const storeORN = (payload) => {
  return {
    type: actions.STORE_ORN,
    payload
  }
}

const storeInitData = (payload) => {
  return {
    type: actions.STORE_INIT_DATA,
    payload
  }
}

const storeCustomeroutstation = (payload) => {
  return {
    type: actions.STORE_CUSTOMER_OUTSTATION,
    payload
  }
}

const storeSelectedDocObject = (payload) => {
  return {
    type: actions.STORE_SELECTED_DOCOBJECT,
    payload
  }
}

const storeSelectedDocPOAObject = (payload) => {
  return {
    type: actions.STORE_SELECTED_DOCPOAOBJECT,
    payload
  }
}

const storeListPOA = (payload) => {
  return {
    type: actions.STORE_LIST_POA,
    payload
  }
}


const storeCustomerLocal =(payload) =>{
  return {
    type :actions.STORE_CUSTOMER_LOCAL_REFERENCE,
    payload 
  }
}

export {
  storeCustomerPOAcapture,
  performLoadingOperation, 
  storeCustomerCircle,
  storeCustomerDelivery,
  storeCustomerNumber,
  storeCustomeroutstation,
  storeCustomerPermanent,
  storeSelectedDocObject,
  storeSelectedDocPOAObject,
  storeListPOA,
  storeORN,
  storeInitData,
  storeCustomerLocal,
  storeCustomerCircleHeader,
  storeCustomerPOImage
};
