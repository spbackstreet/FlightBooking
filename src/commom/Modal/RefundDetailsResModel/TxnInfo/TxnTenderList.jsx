import React, { Component } from "react";
import { Model } from 'react-axiom';

class TxnTenderList extends Model {

    static defaultState() {
        return {
             Type : "",
			 CardNumber : "",
			 ApprovalCode : "",
			 Status : "",
			 ChequeNo : "",
			 GVNo : "",
			 Amount : "",
			 Description : "",
			 AuthCode : "",
			 ExpiryDate : "",
			 MOPID : "",
			 FirstName : "",
			 LastName : "",
			 OrocessingCode : "",
			 LoanRefNo : "",
			 ReceiptTypeDescription : "",
			 TenderNumber : "",
			 TypeDescription : "",
			 RILTenderName : "",
			 TenderMode : "",
			 SchemeNo : "",
			 TenderName : "",
			 CustMobNumber : "",
			 ApprovCode : "",
			 CustName : "",
			 TxnId : "",
			 DeviceId : "",
			 TxnStartTime : "",
			 UserId : "",
			 AccorVoucher : "",
			 Last4Digits : "",
			 CustId : "",
			 TransRefNo : "",
        }
    }
}
export default TxnTenderList