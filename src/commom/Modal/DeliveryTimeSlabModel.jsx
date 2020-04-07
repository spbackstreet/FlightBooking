
import React, { Component } from "react";
import { Model } from 'react-axiom';

class DeliveryTimeSlabModel extends Model {

    static defaultState() {
        return {


            //Request params
            strStoreId: "",
            strPosId: "",
            strUserId: "",
            strTxnId: "",
            strDeliveryDate: "",
            // Response params
            strErrorCode: "",
            strErrorMsg: "",
            timeSlabCount: "",
            DeliveryTimeSlot: "",
        }
    }
}
export default DeliveryTimeSlabModel