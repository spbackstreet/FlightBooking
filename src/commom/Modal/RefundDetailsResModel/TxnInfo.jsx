
import React, { Component } from "react";
import { Model } from 'react-axiom';

class TxnInfo extends Model {

    static defaultState() {
        return {
        TxnHeader : "",
		TxnItemList : [],
		TxnTenderList : [],
		PromoList : []

        }
    }
}
export default TxnInfo