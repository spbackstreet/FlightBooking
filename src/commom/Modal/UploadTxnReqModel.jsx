import React, { Component } from "react";
import { Model } from 'react-axiom';

class PrintReceiptUsingBTWiFiPrinterReqModel extends Model {

    static defaultState() {
        return {
           
            StoreNo : "",
    CAF : "",
    Guid : "",
    Toast : "",
    BillPlanChangeRequest: "",
    BillPayRequest: "",
    CAFRequest: "",
    SimChangeRequest: "",
    objRechargeTopUpAddonRequest: "",
    TxnInfo : "",

        }
    }
}
