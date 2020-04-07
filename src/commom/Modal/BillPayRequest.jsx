
import React, { Component } from "react";
import { Model } from 'react-axiom';

class BillPayRequest extends Model {

    static defaultState() {
        return {

            ORN: "",
            BillPayment_ReasonCode: "",
            PGTranId: "",
            BillPayEAN: "",
            Amount: "",
            AccountId: "",
            Jioroute: "",
            ServiceId: "",
            CircleId: "",
            Customer_Circle: "",
            Mop: "",
        }
    }
}

export default BillPayRequest;
