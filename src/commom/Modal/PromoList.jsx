import React, { Component } from "react";
import { Model } from 'react-axiom';

class PromoList extends Model {

    static defaultState() {
        return {
            
            ItemID : "",
            DeviceId : "",
            TxnStartTime : "",
            PromoAmount : "",
            PromoID : "",
            UserId : "",
            ReceiptRequired : "",
            ReceiptInfo :[],
            SequenceID : "",
            MultipartReceiptRequired : "",
            ItemSequences : [],
            PromoType : "",
            PromoDescription : "",
            TxnId : "",
        }
    }
}
export default PromoList;