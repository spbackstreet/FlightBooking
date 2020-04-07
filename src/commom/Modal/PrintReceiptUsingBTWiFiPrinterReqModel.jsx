import React, { Component } from "react";
import { Model } from 'react-axiom';

class PrintReceiptUsingBTWiFiPrinterReqModel extends Model {

    static defaultState() {
        return {
            storeId: "",
            ticketXml: "",
            printerDriverName: "",
            headerId: "",
            footerId: "",
            bTrainingMode: "",
            reprintTicket: "",
            showTaxSummary: "",
            blutoothFormat: "",
            printerType: "",
            port: "",
            ip: "",
            isVatExtra: "",
            printerName: "",
            lstHeaderLines: [],
            lstFooterLines: [],
            authCode: "",
            environment: "",
            isInterState: "",
            billOfSupplyID: "",
            taxInvoiceID: "",
            MSISDN: "",
            DateandTime: "",
            IsUnionTerritory: "",
            orgTaxInvoice: "",
            orgTxnDate: "",
            orgReceiptNo: "",
            printCustInfoInInvoice : "1",
            printItemPurchasedInInvoice : "1",
            lstTxnJewelsWtList : [],
            listPaperCNRecptList : [] , 
            rilJewelsGoldPurchaseTxn : "0",
            custStateCode: "",
            mbvCouponMsgprint: "",
            isFTTx: false,
            uploadTxnReqModel : "",
            itemList : "",
            strPrintReceiptType : "",
            supplyLocationAddress : "",
            supplyLocationType : "",
            gstTaxResModel : "",
        Pickup: "",
            airMailId : "",
                pickupOrderId : "",


        };
}
}

export default PrintReceiptUsingBTWiFiPrinterReqModel;