import axios from 'axios';
import React, { Component } from "react";
import { async, reject } from 'q';
import { resolve } from 'path';
import { Encrypt, decryptData, EncryptNew, encryption, Decryption, encryptHeader, encryptionDataWithRandomKey } from '../../Common/JS/Encryption-Decryption';
import config from '../../config';
import { conditionalExpression } from '@babel/types';
// import * as constants from './constants';
import { TIMEOUT } from 'dns';


class APIRouter extends React.Component {

  //  *************** For New Encryption ***********//
  async postApiCalNewEncryption(Request, ApiName) {

    var encryptedData = encryptionDataWithRandomKey(Request,  config.userID, config.objDeviceSave.Msg);
    var keyHeader = encryptHeader(Request,// constants.publickey, 
        config.userID, encryptedData);
    //var newHeader=this.createHeaderForNewEncryption(keyHeader);
    try {

      const options = {
        headers: this.createHeaderForNewEncryption(keyHeader)
      };
      return await axios.post(ApiName,
        encodeURIComponent(encryptedData.toString()),
        options,
        { timeout:options ///changes needed
            //constants.apiTimeOut 
        }).then(Response => {

          return decryptData(Response.data.replace(/"/g, ""));
        }).catch(err => {

          return "1000";
        })
    }
    catch (e) {
      return "1000";
    }
  }

  createHeaderForNewEncryption(header) {
    var rquestHeader = {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
      Authorization: config.basicAuth,
      GUID: config.objDeviceSave.Msg,
      storeid: config.objSupervisorLogin.Circle_Response.org,
      KEY: header,
      USERID: config.userID
    }

    return rquestHeader;
  }
  // *********************** END *****************//


  //added by cc

  async postApiCall(request, ApiName) {
    var EncryptedRequest = Encrypt(request);
    try {
      const options = {
        headers: this.createHeaderAgentAuth()
      };
      return await axios.post(config[config.Environment].BaseUrl + ApiName,
        EncryptedRequest,
        options,
        { timeout: options, }).then(Response => {

          return decryptData(Response.data.replace(/"/g, ""));
        }).catch(err => {

          return "1000";
        })

    }
    catch{
      return "1000";
    }

  }

  async postApiCal(request, ApiName) {
    var EncryptedRequest = Encrypt(request);
    try {
      const options = {
        headers: this.createHeader()
      };
      return await axios.post(ApiName,
        EncryptedRequest,
        options,
        { timeout: options, }).then(Response => {

          return decryptData(Response.data.replace(/"/g, ""));
        }).catch(err => {

          return "1000";
        })
    }
    catch{
      return "1000";
    }


  }


  createHeaderAgentAuth() {
    var rquestHeader = {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
      authorization: EncryptNew(config.basicAuth),
      userid: EncryptNew(config.userID)

    }
    return rquestHeader;
  }

  createHeaderL() {

    var rquestHeader = {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
      authorization: config.basicAuth,
      GUID: config.objDeviceSave.Msg,
      // 'X-API-Key': config.objSupervisorLogin.APIKey,
      // storeid: config.objGetStore.StoreID
    }

    return rquestHeader;
  }

  createHeader() {

    var rquestHeader = {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
      authorization: config.basicAuth,
      GUID: config.objDeviceSave.Msg,
      storeid: config.objSupervisorLogin.Circle_Response.org
    }
    return rquestHeader;
  }


  async postApiCalStoreID(request, ApiName) {
    var EncryptedRequest = Encrypt(request);

    try {

      const options = {
        headers: this.createHeaderStoreID()
      };
      return await axios.post(ApiName,
        EncryptedRequest,
        options,
        { timeout: options, })
        .then(Response => {

          return decryptData(Response.data.replace(/"/g, ""));
        }).catch(err => {

          return "1000";
        })
    }
    catch (err) {
      return "1000";
    }
  }

  async postApiCalStoreIDJava(request, ApiName) {
    var EncryptedRequest = Encrypt(request);

    try {

      const options = {
        headers: this.createHeaderStoreID()
      };
      return await axios.post(ApiName,
        EncryptedRequest,
        options,
        { timeout: options, })
        .then(Response => {

          return decryptData(Response.data.replace(/"/g, ""));
        }).catch(err => {

          return "1000";
        })
    }
    catch (e) {
      return "1000";
    }

  }

  createHeaderStoreID() {

    var rquestHeader = {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
      authorization: config.basicAuth,
      GUID: config.objDeviceSave.Msg,
      storeid: config.objSupervisorLogin.Circle_Response.org
    }

    return rquestHeader;

  }

}
export default (APIRouter);

