import React, { Component } from "react";
import { Model } from 'react-axiom';

class StaticVarsAndClasses extends Model {

    static defaultState() {
        return {
            lstItemDetails: [{}],
            voidedLstItemDetails: [{}],

            lstmodelcrosslinkitem: [],
            lstCrossSellRemaining: [{}],

            lstCustPurchaseHistory: [],
            lstModelReferenceIdItems: [],
            lstModelData: [],

            posMsgMap: [{}],
            posMsgList: [{}],
            posMsgAllList: {},

            lensDataList: {},

            // public static HashMap<String, ArrayList<HashMap<String, POSMsgIDModel>>>
            // posMsgAllList = new HashMap<String, ArrayList<HashMap<String,
            // POSMsgIDModel>>>();

            lstItemLevelSMSCoupon: [],
            lstTxnLevelSMSCoupon: [],
            lstPromoDetail: [],

            groupItem: [],
            childItem: [],
            // public static String buttonVersion="";
            // public static String tenderVersion="";

            bDeviceLog: "",
            bServiceLog: "",
            macID: "",
            voucherProdList: [],
            jVoucherTotalAmt: "",

            lstItemsForLablePrinting: [{}],

            lstLogoFiles: {},
            promoCouponResponseModel: ""
        }

    }
}
export default StaticVarsAndClasses