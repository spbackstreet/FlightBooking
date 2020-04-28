import axios from 'axios';
import { basicAuth } from './basicAuth';
import config from '../config';

// *************** For API Call **********************
const postApiCall = async (Request, ApiName) => {
  try {


    // if (ApiName.includes("HealthService")) {
    //   return await axios.post(ApiName, Request, {
    //     data: { stopIntercept: true },
    //   });
    // }
    // else {
      return await axios.post(ApiName,
        Request)
    // }

  }
  catch (err) {
    console.log("err.message : ", err);
    return "1000";
  }
}




const createHeaderStoreID = () => {

  if (config.applicationType == 'React') {
    var basicAuthVal = basicAuth(config.userID);
    basicAuthVal = 'Basic ' + basicAuthVal
  }
  else {
    basicAuthVal = config.basicAuth
  }

  var rquestHeader = {
    Accept: 'application/json',
    'Content-Type': 'text/plain',
    authorization: basicAuthVal,
    GUID: config.guid,
    storeid: config.storeID,
    USERID: config.userID,
    Circle : config.custCircleHeader

  }

  return rquestHeader;

}



// ***************** For New Enc Headers
const createHeaderForNewEncryption = (header, basicAuth) => {
  var rquestHeader = {
    Accept: 'application/json',
    'Content-Type': 'text/plain',
    Authorization: basicAuth,
    GUID: config.guid,
   // storeid: config.storeID,
    KEY: header,
    USERID: config.userID,
    Circle : config.custCircleHeader  
  }

  return rquestHeader;
}




// ***************** For .Net **************

const postApiCalStoreIDDotNet = (EncryptedRequest, ApiName) => {
  try {
    const options = {
      headers: createHeaderStoreIDDotNet()
    };
    return axios.post(ApiName,
      EncryptedRequest,
      options)


  }
  catch (err) {
    return "1000";
  }
}




const createHeaderStoreIDDotNet = () => {

  if (config.applicationType == 'React') {
    var basicAuthVal = basicAuth(config.userID);
    basicAuthVal = 'Basic ' + basicAuthVal
  }
  else {
    basicAuthVal = config.basicAuth
  }

  var rquestHeader = {
    Accept: 'application/json',
    'Content-Type': 'text/plain',
    authorization: basicAuthVal,
    GUID: config.guid,
    USERID: config.userID

  }

  return rquestHeader;

}





//******************** For Devfin
const postApiCalDevfin = (Request, ApiName) => {
  console.log("header devfin : ", createHeaderDevfin())
  try {
    const options = {
      headers: createHeaderDevfin()
    };
    return axios.post(ApiName,
      Request,
      options)


  }
  catch (err) {
    return "1000";
  }
}




const createHeaderDevfin = () => {

  if (config.applicationType == 'React') {
    var basicAuthVal = basicAuth(config.userIDDevfin);
    basicAuthVal = 'Basic ' + basicAuthVal
  }
  else {
    basicAuthVal = 'Basic TyFtVSRlcjpQQHNzdzByZA=='

  }

  var rquestHeader = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    authorization: 'Basic TyFtVSRlcjpQQHNzdzByZA==',

  }
  return rquestHeader;
}




export {
  postApiCall, postApiCalStoreIDDotNet, postApiCalDevfin, createHeaderDevfin, createHeaderForNewEncryption
  , createHeaderStoreIDDotNet, createHeaderStoreID
};