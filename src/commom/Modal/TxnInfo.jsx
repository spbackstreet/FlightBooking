import React, { Component } from "react";
import { Model } from 'react-axiom';

class TxnInfo extends Model {

    static defaultState() {
        return {
            OrgRefundDetails: "",
            PromoList: [],
            PromoDiscountCouponDetails: [],
            TxnHeader: "",
            TxnTenderList: [],
            TxnItemList: [],
        }
    }
}

export default TxnInfo;




