import React, { Component } from "react";
import { Model } from 'react-axiom';

class PromoList extends Model {

    static defaultState() {
        return {
            PromoID : "",
			ItemId : "",
			PromoType : "",
			SequenceID : "",
			PromoAmount : "",
			PromoDescription : "",
			TxnId : "",
			TxnStartTime : "",
			DeviceId : "",
			UserId : "",
        }
    }
}
export default PromoList