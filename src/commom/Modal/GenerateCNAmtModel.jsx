

import React, { Component } from "react";
import { Model } from 'react-axiom';

class GenerateCNAmtModel extends Model {

    static defaultState() {
        return {
            userId: "",
            regId: "",
            storeId: "",
            amount: "",
            uniqueRefernceId: "",
            guId: "",
            errorCode: "",
            errorMsg: "",
            creditNoteId: "",
            strExpiryDate: "",
            txnID: "",
        }
    }
}

export default GenerateCNAmtModel