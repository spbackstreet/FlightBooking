
import React, { Component } from "react";
import { Model } from 'react-axiom';

class TxnJewelsWtList extends Model {

    static defaultState() {
        return {
        Purity : "",
        MetalRatePerGm : "",
        SKUNumber : "",
        Qty : "",
        Netqty : "",
        Dmdqty : "",
        Stnqty : "",
        SeqID : "",

        }
    }
}

export default TxnJewelsWtList