import React, { Component } from "react";
import { Model } from 'react-axiom';

class POSMsgIDModel extends Model {

    static defaultState() {
        return {
            posMsgID: "",
            posMsgDesc: "",
            posMsgType: "",
            posMsgName: "",
            printRequired: "",
            posMsgDataType: "",
            posMessageDataMinLength: "",
            posMessageDataMaxLength: "",
            posMsgValidationRequired: "",
            posMsg_IsRequiredForDCItem: "",
            strProductSequenceId: "",
            strsubDeptID: "",
            posMsgIDList: []
        }
    }
}
export default POSMsgIDModel