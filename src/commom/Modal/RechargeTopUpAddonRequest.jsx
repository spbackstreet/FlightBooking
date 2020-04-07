import React, { Component } from "react";
import { Model } from 'react-axiom';

class RechargeTopUpAddonRequest extends Model {

    static defaultState() {
        return {

            TermCode: "",

            Amount: "",
        StockType: "",
        Mop: "",
        Customer_Circle: "",
        ORN: "",
        PGTranId: "",
        BillPayEAN: "",
        Email: "",
        AccountId: "",
        CustomerId: "",
        Jioroute: "",
        ServiceId: "",
        MSISDN: "",
        circleId: "",
        AccountType : "",
        SubscriptionType : "",
        CompanyCode : "",
        VoicServiceID : "",
        VoiceChargingID : "",
        VoiceSrviceType : "",
        DataserviceID : "",
        DataChargingID : "",
        DataServiceType : "",
        Productstate : "",
        AgentState : "",

        }
    }
}

export default RechargeTopUpAddonRequest;