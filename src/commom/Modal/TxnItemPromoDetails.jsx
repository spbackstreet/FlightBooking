import React, { Component } from "react";
import { Model } from 'react-axiom';
class TxnItemPromoDetails extends Model {

    static defaultState() {
        return {
           
            Promo_Desc: "",
            Promo_Amount: "",
            Promo_Id: "",
        }
    }
}

export default TxnItemPromoDetails;