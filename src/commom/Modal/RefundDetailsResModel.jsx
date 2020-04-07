import React, { Component } from "react";
import { Model } from 'react-axiom';

class RefundDetailsResModel extends Model {

    static defaultState() {
        return {
            //
    Errorcode : "",
	Errormsg : "",
	TxnInfo : "",
	offlineBajajFinance : "",
	onlineBajajFinance : "",
	capitalFirst : "",
	tataFinance : "",
	aeonFinance : "",
	hdfcFinance : "", 
	hdbfsFinance : "",
	vimalEmiFinance : "",
        }
    }
}
export default RefundDetailsResModel