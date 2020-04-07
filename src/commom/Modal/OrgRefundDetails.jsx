
import React, { Component } from "react";
import { Model } from 'react-axiom';

class OrgRefundDetails extends Model {

    static defaultState() {
        return {
            OriginalTransactionNo : "",
            OriginalPOSNo : "",
            OriginalStoreCode : "",
            OriginalTransactionDate : "",
        }
    }
}
export default OrgRefundDetails