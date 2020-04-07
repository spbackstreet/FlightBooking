import React, { Component } from "react";
import { Model } from 'react-axiom';

class TxnTenderList extends Model {

    static defaultState() {
        return {
            
            RILTenderName: "",
            TxnStartTime: "",
            Type: "",
            CustMobNo: "",
            TransRefNo: "",
            ChequeNo: "",
            LastName: "",
            TenderNumber: "",
            CustName: "",
            SequenceId_Tender: "",
            AccorVoucher: "",
            FirstName: "",
            XmlGeneratedFlag: "",
            CardNumber: "",
            TenderMode: "",
            DeviceId: "",
            Description: "",
            Amount: "",
            ApprovalCode: "",
            Last4Digits: "",
            ProcessingCode: "",
            TenderName: "",
            LoanRefNo: "",
            TypeDescription: "",
            UserId: "",
            CustID: "",
            ApprovCode: "",
            MOPID: "",
            ExpiryDate: "",
            Status: "",
            AuthCode: "",
            ReceiptTypeDescription: "",
            GVNo: "",
            SchemeNo: "",
            TxnId: "",
            MobileNo: "",
            SKUID: "",
            VoucherType: "",
        }
    }
}

export default TxnTenderList;