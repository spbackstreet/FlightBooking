import React, { Component } from "react";
import { Model } from 'react-axiom';

class TopupRechargeDetailsModel extends Model {

    static defaultState() {
        return {

            ORN: "",
            MOP: "",
            PGTranID: "",
            amount: "",
            serviceID: "",
            circleId: "",
            firstName: "",
            emailID: "",
            mobileNo: "",
            MSISDN: "",
            customerId: "",
            accountID: "",
            custCircleID: "",
            jioRoute: "",
            planIDs: "",
            productCode: "",
            lstServiceFeatureCode: [],
            newServiceORN: "",
            stockCheck: "",
            //JIO FIBER Recharge START
            AccountType: "",

            SubscriptionType: "",
            CompanyCode: "",
            VoicServiceID: "",
            VoiceChargingID: "",
            VoiceSrviceType: "",
            DataserviceID: "",
            DataChargingID: "",
            DataServiceType: "",
            ProductState: "",
            //END
            rtaType: "",
            lstPlans : []
        };
    }



}


export default TopupRechargeDetailsModel;
