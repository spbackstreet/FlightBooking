import React, { Component } from "react";
import { Model } from 'react-axiom';

class GSTTaxResModel extends Model {

    static defaultState() {
        return {
            strErrorCode: "",
            strErrorMsg: "",
            txnTotal: "",
            errorCode: "",
            errorMsg: "",
            hsnCode: "",
            taxMap: {},
            lstHSNCode: [],
        }
    }
}

export default GSTTaxResModel;