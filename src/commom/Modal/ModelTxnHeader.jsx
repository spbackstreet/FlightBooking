import React, { Component } from "react";
import { Model } from 'react-axiom';

class ModelTxnHeader extends Model {

    static defaultState() {
        return {
            //
            IS_BULK_JIO_PHONE_SALE: false,
            BULK_JIO_AMOUNT: "",
            TxnId: "",
            ProductVersion: "",
            ReceiptRefID: "",
            TxnTotal: "",
            TxnStatus: "",
            TxnStartTime: "",
            TxnEndTime: "",
            TxnMarkDownReason: "",
            TxnMarkDownReasonDesc: "",
            RoundOffConfigValue: "",
            RoundOffAmount: "",
            PaymentStartTime: "",
            PaymentEndTime: "",
            // UserID="";
            DeviceID: "",
            IsAddressCaptured: "",
            IsLoyaltyCardCaptured: "",
            IsLoyaltyRedeemed: "",
            RedeemAmount: "",
            BalanceLoyaltyPoints: "",
            IsValidLoyaltyRedemption: "",
            IDProofCaptureStatus: "",
            IsIDProofRequiredFlag: "",
            ExpectedDeliveryDate: "",
            ExpectedDeliveryTime: "",
            ORN: "",
            ChangeDue: "",
            isMDTApplied: "",
            TxnDiscValue: "",
            TxnDiscValueFlag: "",
            TxnAppliedDiscValue: 0.00,
            TransactionType: "",
            TxnSalesManID: "",
            PromoTotal: "0.00",
            CurReferenceID: "",
            TxnDiscAppliedTime: "",
            ResumeOrgTxnID: "",
            ResumeOrgPosNum: "",
            ResumeOrgDateTime: "",
            LogonTime: "",
            ItemCount: "",
            IsCouponApplied: "",
            CouponID: "",
            CouponType: "",
            CouponValue: "",
            CouponValueType: "",
            CouponValueParam: 0.00,
            ReceiptTextPath: "",
            isRailwayTxn: "",
            // barcodeData="";

            // for new tags
            VoidTxnSupervisorID: "",
            RefundTxnSupervisorID: "",
            TxnDiscSupervisorID: "",
            TaxableAmount: 0.00,
            TxnCouponSupervisorID: "",
            // For vat extra
            TotalVAT: 0.00,
            TotalAddnlTax: 0.00,
            TotalSurcharge: 0.00,
            TotalTaxAmount: 0.00,
            IsTaxCalculationRequired: "",
            // CNC related tags
            strLST: "",
            strLSTDate: "",
            strCST: "",
            strCSTDate: "",
            // CNC variables
            strMemberNumber: "",
            strMemberName: "",
            strLstNumber: "",
            strCustNumber: "",
            strDateLst: "",
            strDateCust: "",
            strMemberAddLine1: "",
            strMemberAddLine2: "",
            strMemberAddLine3: "",
            strMemberPhoneNumber: "",
            strPinCode: "",
            strPANCardNumber: "",
            maxBillAmount : "",
            // For EKYC
            strIsDeviceSell: "0",
            // For Oxigen
            strIsOxigenrecharge: "",

            custDetailsRequired : "",
            poapoirequired : "",
            // Other variables
            dFoodAmtPaidByFoodAllowedTender: 0.00,
            retrieveTxnLoginTime: "",
            orderType: "",
            strProductcatalogue: "",
            sequenceID: 0,


            isFeaturePhone : "",
            isChips : "",

            isJioCarConnect : "",
            isJPhoneSim : "",
            isFeaturePhoneWithPaperCaf : "",
            isOldFeaturePhone : "",

            //For GST inter state retrieval txn
            isInterState : "",
            isGngTxnCompleted : "",
            isHdTxnCompleted : "",
            billOfSupplyID: "",
            taxInvoiceID: "",
            ARVInvoiceID: "",

            isGSTForRWH: true,

            isJioCarConnectDOAORRFN: false,

            isJioPhoneDOAORRFN: false,
            isJioChipsDOAORRFN: false,
            isDeviceLockDOAORRFN: false,

            searchTypeDOAORRFN: "",

            // searchTypeForJioCarConnect="";
            jioOrderType: "",
            jioMopID: "",
            jioMopAmount: "",
            jioPickupOrderID: "",
            isJioPickup: false,
            jioPickupResumeTxnhashMap: {},
            ispickupcrash: false,
            jioMop: [],
            jioPickuphashMap: {},
            jioPickuptransrefnomap: {},

            jioLoyaltyPoints: 0,
            isReplacement: false,

            MSISDN: "",
            TxnType: "",
            sdInvoiceID: "",
            jPhoneSimIMEI: "",

            isFioriTxn: false,
            frcPrice: "0.00",
            MNP_MSISDN: "",

            // public static List<TxnInvoiceCategory> lstTxnInvoice_Category = new ArrayList<>();
            stTxnInvoice_Category: [],


            JIO_GENERIC_VALUE_SELECTED: "",
            isJPBDeposit: false,
            isJPB: false,
            uploadTxnReqDetail: {},
            TxnUnoECnumber: "",
            isNotDelivered: false,
            IS_POD_ORDER: false,
            UPLOAD_URL_POD: "",
            POD_ORN: "",

            IS_TV_VOUCHER_REDEMPTION: false,

        }
    }
}
export default ModelTxnHeader;