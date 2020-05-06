import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-spinner-material';
import { FixedHeader } from '../../commom/FixedHeader';
import config from '../../config';
import '../../css/style.css';
import useGlobalState from '../../hooks/useGlobalState';
import useLoader from '../../hooks/useLoader';
import * as constants from '../../commom/constants';
import { getCurrentDateForPOAPOI, getCurrentDateForTxn, getFourDigitsTxnId, getCurrentDateForReceipt, hmacshaChecksum } from '../../commom/CommonMethods';
import validateOTP from '../../services/validateOTP';
import uploadTxnDataNextGenService from '../../services/uploadTxnDataNextGenService';
import getTaxSummaryGSTService from '../../services/getTaxSummaryGSTService';
import CAFRequest from "../../txnUploadData/cafRequest";
import txnUploadData from '../../txnUploadData/txnUploadData';
import useGeolocation from 'react-hook-geolocation'
import GlobalORNModel from '../../Model/ORNModel';
import getORNViaTibcoService from '../../services/getORNViaTibcoService';
import getTransactionIdService from '../../services/getTransactionIdService';
import uploadDocumentService from '../../services/uploadDocumentService';
import getItemMrpDetailsRPOSService from '../../services/getItemMrpDetailsRPOSService';
import cAFValidationService from '../../services/cAFValidationService';
import PlanselectionModel from '../../commom/Modal/PlanselectionModel';
import getBilldeskQueryStr from '../../services/getBilldeskQueryStr';
import getBilldeskModalQueryStr from '../../services/getBilldeskModalQueryStr';
import checkMobile from '../../services/checkMobile';


var GSON = require('gson');

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

let status = ""

export const updateState = (param) => {
    status = param

}


const CustOTP = () => {
    const [doneC, setdoneC] = useState(false)
    const [time, settime] = useState({})
    const [custOtp, setcustOtp] = useState('')
    let [seconds, setseconds] = useState(30)
    const [displayConsent, setdisplayConsent] = useState(false)
    const [displayOTPSuccess, setdisplayOTPSuccess] = useState(false)
    let [timer, settimer] = useState(0)
    // const [{ app: { pincode, custNumber, ORN, poiImage } }, dispatch] = useGlobalState();
    const [triggerAction] = useLoader();
    const [loading, setloading] = useState(false)
    const [TxnID, setTxnID] = useState('')
    let [finCAFRequest, setfinCAFRequest] = useState();
    let [fintxnUploadData, setfintxnUploadData] = useState();

    const history = useHistory();
    const geolocation = useGeolocation()

    useEffect(() => {
        // setfinCAFRequest(CAFRequest);
        // setfintxnUploadData(txnUploadData);
        fintxnUploadData = txnUploadData;
        let CountdownTimer = initializeTimer()
        console.log('CountdownTimer', CountdownTimer)
        settime(CountdownTimer)
        document.getElementById("scust").click();
    }, [])

    const initializeTimer = () => {
        let timeLeftVar = secondsToTime(seconds);
        return (timeLeftVar)
    }

    const secondsToTime = (secs) => {

        let hours = Math.floor(secs / (60 * 60));
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    const ResendOTP = (e, param) => {

        if (seconds === "00" && param === "cust") {
            setseconds(30);
            setdoneC(false)
            startTimer()
            resendCustOtp();
        }

    }


    const resendCustOtp = async () => {
        const callCheckMobile = await triggerAction(() => checkMobile(config.custNumber));
    }

    const startTimer = (e) => {
        if (timer == 0 && seconds > 0) {
            settimer(setInterval(countDown, 1000));
        }

    }

    const countDown = () => {
        seconds = seconds - 1;
        if (seconds >= 0) {
            if (seconds.toString().length > 1) {
                settime(secondsToTime(seconds))
                setseconds(seconds)

            }
            else {
                seconds = 0 + seconds;
                settime(secondsToTime('0' + seconds))
                setseconds('0' + seconds)
            }
        }
        if (seconds == 0) {
            console.log("endedA")
            setdoneC(true)
            clearInterval(timer);

        }
    }

    const setOtp = (evt, param) => {
        const value1 = (evt.target.validity.valid) ? evt.target.value : evt.target.value.substring(0, evt.target.value.length - 1);

        if (param === "custOtp") {
            setcustOtp(value1);
        }
    }

    const send_Cust_Agent = () => {
        sendDigitalKycOTP(config.orderType)
    }

    const sendDigitalKycOTP = async (orderType) => {
        setloading(true)
        const callValidateOTP = await triggerAction(() => validateOTP(config.custNumber, custOtp, config.ORN));
        setloading(false)

        if (callValidateOTP.errorCode === "00") {
            config.guid = callValidateOTP.guid

            const currentDateTime = getCurrentDateForPOAPOI()

            CAFRequest.DG_OTP = "OTP;Z00092;423504;" + JSON.stringify(geolocation.latitude).substring(0, 9) + "," + JSON.stringify(geolocation.longitude).substring(0, 9) + ";" + currentDateTime + ";" + CAFRequest.RMN + ";" + config.OTPGenTime + ";"
            // CAFRequest.DG_OTP = "OTP;Z00092;423504;" + "19.167634" + "," + "73.07347" + ";" + currentDateTime + ";" + CAFRequest.RMN + ";" + config.OTPGenTime + ";"

            CAFRequest.DG_ATP = "ATP;Z00092;520048;" + JSON.stringify(geolocation.latitude).substring(0, 9) + "," + JSON.stringify(geolocation.longitude).substring(0, 9) + ";" + currentDateTime + ";" + config.agentMobile + ";" + config.OTPGenTime + ";"
            // CAFRequest.DG_ATP = "ATP;Z00092;520048;" + "19.167634" + "," + "73.07347" + ";" + currentDateTime + ";" + config.agentMobile + ";" + config.OTPGenTime + ";"


            openOtpValidationSuccessDialog();

        }
        else if (callValidateOTP.errorCode === '03' || callValidateOTP.errorCode === '3') {
            confirmAlert({
                title: "Alert!",
                //Pending For confirmation of Error Msg
                message: "Session Expired",
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => {
                            history.push('/home');
                            // logout(this, this.props, config); 
                        }
                    }
                ]
            });

        }
        else {
            confirmAlert({

                message: callValidateOTP.errorMsg,
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false }
                    }
                ]
            });
        }
        openOtpValidationSuccessDialog();
    }

    const openOtpValidationSuccessDialog = (e) => {
        setdisplayOTPSuccess(!displayOTPSuccess)
    }


    const validateDigitalKycOTP = async () => {
        if (custOtp && document.getElementById('chkC').checked === true) {
            send_Cust_Agent()
        }
        else {
            confirmAlert({
                message: 'Please Enter OTP and accept customer consent.',
                buttons: [
                    {
                        label: 'Ok',
                    },

                ]
            });
        }
        // const callValidateOTP = await triggerAction(() => validateOTP(custNumber, custOtp, ORN));
    }



    const getCAFNumber = async () => {

        // setloading(true)
        // GlobalORNModel.setGuid(config.objDeviceSave.Msg);
        // GlobalORNModel.setStoreid(config.objGetStore.StoreID);
        // GlobalORNModel.setTransName('CF');

        // const getORNViaTibco = await triggerAction(() => getORNViaTibcoService());

        // setloading(false);
        // if (getORNViaTibco.ErrorCode === "00") {
        //     CAFRequest.CAF_NUMBER = config.agentCircleId + getORNViaTibco.ORN
        callTransactionAPIs();
        // }
        // else {
        //     confirmAlert({
        //         message: getORNViaTibco.ErrorMsg,
        //         buttons: [
        //             {
        //                 label: 'OK',
        //             }
        //         ]
        //     });
        // }

    }

    const callTransactionAPIs = async () => {
        setloading(true)
        const getTransactionId = await triggerAction(() => getTransactionIdService());

        setloading(false)
        if (getTransactionId.ErrorCode === "00") {

            setTxnID(getTransactionId.TxnID)
            config.TxnID = getTransactionId.TxnID
            config.TaxInvoice = getTransactionId.TaxInvoice;
            txnUploadData.TxnInfo.TxnHeader.TxnStartTime = getCurrentDateForTxn();
            txnUploadData.TxnInfo.TxnHeader.LogonTime = getCurrentDateForTxn();
            callGetItemMrpDetailsRPOS(getTransactionId); 

        }
        else {
            confirmAlert({

                message: getTransactionId.ErrorMsg,
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
        }

    }


    const callGetItemMrpDetailsRPOS = async (txnRes) => {

        console.log('planselectionMode', PlanselectionModel);
        setloading(true)
        debugger;
        const getItemMrpDetailsRPOS = await triggerAction(() => getItemMrpDetailsRPOSService(config.frcID));
        setloading(false)
        if (getItemMrpDetailsRPOS.Errorcode == "00" || getItemMrpDetailsRPOS.Errorcode == "0") {
            const arrayResponse = []
            arrayResponse.push(getItemMrpDetailsRPOS)
            setTxnitemList(arrayResponse, txnRes)
            uploadDocuments()
        }
    }

    const setTxnitemList = (getItemMrpDetailsRes, txnRes) => {
        const TxnItemList = []
        let total = 0;

        for (let i = 0; i < getItemMrpDetailsRes.length; i++) {
            total = total + getItemMrpDetailsRes[i].RtlPrice;


            let txnitem = {
                BatchNumber: "",
                Colorcode: "",
                CouponID: "",
                CouponSupervisorID: "",
                CouponType: "",
                CouponValue: "",
                CouponValueParam: "",
                CouponValueType: "",
                DeliveryLocation: "",
                DeliveryLocationId: "",
                Description: getItemMrpDetailsRes[i].Desc,
                DiscountAmount: "0.00",
                DiscountID: "",
                DiscountPercentage: "0.00",
                DiscountWithQty: "0.00",
                EffectivePrice: parseFloat(getItemMrpDetailsRes[i].RtlPrice),
                EmbeddedTotalPrice: "0.00",
                EnterEANorSKU: getItemMrpDetailsRes[i].intenalID,
                EntryMethod: "S",
                ExpectedDeliveryDate: "",
                ExpectedDeliveryTime: "",
                ExpiryDate: "",
                Extnd_bckt_nbr: "0",
                Extnd_prom_nbr: "0",
                HSN_CODE: getItemMrpDetailsRes[i].HSN_CODE,
                IsCouponApplied: "0",
                ItemDiscAppliedTime: "",
                ItemEmpDiscSupervisorID: "",
                ItemEmployeeDiscount: "0.00",
                ItemMarkDownDescription: "",
                ItemMarkDownDiscountFlag: "",
                ItemMarkDownDiscountParam: "0.00",
                ItemMarkDownDiscountValue: "0.00",
                ItemMarkDownReason: "",
                ItemMarkDownSupervisorID: "",
                ItemMesurementType: getItemMrpDetailsRes[i].itemMeasurementType,
                ItemSellingPrice: parseFloat(getItemMrpDetailsRes[i].RtlPrice),
                ItemType: getItemMrpDetailsRes[i].Itemtype,
                ItemUnitPriceAfterDiscount: parseFloat(getItemMrpDetailsRes[i].RtlPrice),
                LnkItemList: [
                ],
                LocationType: "",
                MDIAppliedDateTime: "",
                MD_FG: "0",
                MaximumQuantity: "1",
                OrgPrice: getItemMrpDetailsRes[i].RtlPrice,
                OrgSeqId: "",
                OriginalBarcode: "",
                OriginalPriceWithQty: parseFloat(getItemMrpDetailsRes[i].RtlPrice),
                OtherDiscounts: "0.00",
                ParentReferenceID: "",
                PosMsgDetails: [
                ],
                ProductID: getItemMrpDetailsRes[i].ProductID,
                QtyChangeDateTime: "",
                Quantity: "1",
                QuantityAdded: "",
                QuantityFlag: "0",
                SalesManID: "",
                ScanTime: getCurrentDateForTxn(),
                SellingPrice: parseFloat(getItemMrpDetailsRes[i].RtlPrice),
                SequenceID: (i + 1),
                Status: "",
                StockCheckRequired: "0",
                StockCount: "",
                StoreID: config.storeID,
                Stylecode: "0",
                SupervisorID: "",
                TaxDetails: {
                    AddlDetailsList: [
                    ],
                    TaxCodeType: "",
                    TaxGSTList: [
                        // {
                        //     HSN_TYPE : "",
                        //     SEQUENCEID_TAX: "",
                        //     TaxAmount: "",
                        //     TaxRate: ""
                        // },
                        // {
                        //     HSN_TYPE : "",
                        //     SEQUENCEID_TAX: "",
                        //     TaxAmount: "",
                        //     TaxRate: "0"
                        // }
                    ],
                    TaxType: "",
                    TaxableAmount: ""
                },
                TxnItemPromoDetails: [
                ],
                UnitOfMeasure: "EA",
                ValidatedPosMsgId: "",
                VoidSupervisorID: "",
                VoidedDateTime: "",
                isDiscountApplied: "0",
                isLinkedItemsPresentFlag: "1",
                isMDIApplied: "0",
                isPromotionAvailableFlag: "0",
                isTradeInItem: "0",
                isVoidAllowed: "0",
                itm_point: "0",
                prom_nbr: "0"
            };
            TxnItemList.push(txnitem)
        }
        config.amount = parseFloat(total);

        txnUploadData.TxnInfo.TxnItemList = TxnItemList;
        fintxnUploadData = txnUploadData

        setTxnHeader(txnRes);
    }

    const setTxnHeader = (txnRes) => {
        debugger;

        fintxnUploadData.TxnInfo.TxnHeader.Area = "";
        fintxnUploadData.TxnInfo.TxnHeader.BalanceLoyaltyPoints = "";
        fintxnUploadData.TxnInfo.TxnHeader.BillOfSupply = txnRes.BillOfSupply;
        fintxnUploadData.TxnInfo.TxnHeader.BlockNo = "";
        fintxnUploadData.TxnInfo.TxnHeader.BuildingName = "";
        fintxnUploadData.TxnInfo.TxnHeader.ChangeDue = "0.00";
        fintxnUploadData.TxnInfo.TxnHeader.City = "";
        fintxnUploadData.TxnInfo.TxnHeader.ContactNumber = CAFRequest.MSISDN
        fintxnUploadData.TxnInfo.TxnHeader.CouponID = "";
        fintxnUploadData.TxnInfo.TxnHeader.CouponType = "";
        fintxnUploadData.TxnInfo.TxnHeader.CouponValue = "";
        fintxnUploadData.TxnInfo.TxnHeader.CouponValueParam = "";
        fintxnUploadData.TxnInfo.TxnHeader.CouponValueType = "";
        fintxnUploadData.TxnInfo.TxnHeader.CurReferenceID = "";
        fintxnUploadData.TxnInfo.TxnHeader.CustomerID = "";
        fintxnUploadData.TxnInfo.TxnHeader.CustomerName = CAFRequest.FirstName + " " + CAFRequest.MiddleName + " " + CAFRequest.LastName;
        fintxnUploadData.TxnInfo.TxnHeader.DeviceId = config.deviceId //add device id
        fintxnUploadData.TxnInfo.TxnHeader.DoctorsAdd1 = "";
        fintxnUploadData.TxnInfo.TxnHeader.DoctorsAdd2 = "";
        fintxnUploadData.TxnInfo.TxnHeader.DoctorsAdd3 = "";
        fintxnUploadData.TxnInfo.TxnHeader.DoctorsName = "";
        fintxnUploadData.TxnInfo.TxnHeader.ESOrderID = CAFRequest.ORN;
        fintxnUploadData.TxnInfo.TxnHeader.EmailID = CAFRequest.Email
        fintxnUploadData.TxnInfo.TxnHeader.EmailId = CAFRequest.Email
        fintxnUploadData.TxnInfo.TxnHeader.FlatNo = "";
        fintxnUploadData.TxnInfo.TxnHeader.FloorNo = "";
        fintxnUploadData.TxnInfo.TxnHeader.IDProofCaptureStatus = "";
        fintxnUploadData.TxnInfo.TxnHeader.IsAddressCaptured = "";
        fintxnUploadData.TxnInfo.TxnHeader.IsCouponApplied = "";
        fintxnUploadData.TxnInfo.TxnHeader.IsIDProofRequiredFlag = "";
        fintxnUploadData.TxnInfo.TxnHeader.IsLoyaltyCardCaptured = "";
        fintxnUploadData.TxnInfo.TxnHeader.IsLoyaltyRedeemed = "";
        fintxnUploadData.TxnInfo.TxnHeader.IsValidLoyaltyRedemption = "";
        fintxnUploadData.TxnInfo.TxnHeader.IsVatExtra = "";
        fintxnUploadData.TxnInfo.TxnHeader.ItemCount = "2";
        fintxnUploadData.TxnInfo.TxnHeader.LogonTime = "";
        fintxnUploadData.TxnInfo.TxnHeader.LoyaltyCardNumber = "";
        fintxnUploadData.TxnInfo.TxnHeader.MNP_MSISDN = "";
        fintxnUploadData.TxnInfo.TxnHeader.OrderType = "DIB";
        fintxnUploadData.TxnInfo.TxnHeader.PanCardNo = "";
        fintxnUploadData.TxnInfo.TxnHeader.PatientsAdd1 = "";
        fintxnUploadData.TxnInfo.TxnHeader.PatientsAdd2 = "";
        fintxnUploadData.TxnInfo.TxnHeader.PatientsAdd3 = "";
        fintxnUploadData.TxnInfo.TxnHeader.PatientsName = "";
        // fintxnUploadData.TxnInfo.TxnHeader.PaymentEndTime= "";
        // fintxnUploadData.TxnInfo.TxnHeader.PaymentStartTime= "";
        fintxnUploadData.TxnInfo.TxnHeader.Pincode = "";
        fintxnUploadData.TxnInfo.TxnHeader.PlotNo = "";
        fintxnUploadData.TxnInfo.TxnHeader.ProductVersion = "10.4.7";
        fintxnUploadData.TxnInfo.TxnHeader.PromoTotal = "";
        fintxnUploadData.TxnInfo.TxnHeader.ReceiptRefID = "";
        fintxnUploadData.TxnInfo.TxnHeader.ReceiptTextPath = "";
        fintxnUploadData.TxnInfo.TxnHeader.RedeemAmount = "";
        fintxnUploadData.TxnInfo.TxnHeader.RefundTxnSupervisorID = "";
        fintxnUploadData.TxnInfo.TxnHeader.RoundOffAmount = "";
        fintxnUploadData.TxnInfo.TxnHeader.RoundOffConfigValue = "";
        fintxnUploadData.TxnInfo.TxnHeader.Sector = "";
        fintxnUploadData.TxnInfo.TxnHeader.SocietyName = "";
        fintxnUploadData.TxnInfo.TxnHeader.State = "";
        fintxnUploadData.TxnInfo.TxnHeader.Street = "";
        fintxnUploadData.TxnInfo.TxnHeader.Supply_State_Code = "";
        fintxnUploadData.TxnInfo.TxnHeader.TaxInvoice = txnRes.TaxInvoice;
        fintxnUploadData.TxnInfo.TxnHeader.TaxableAmount = "0.00";
        fintxnUploadData.TxnInfo.TxnHeader.TransactionType = "SALE";
        fintxnUploadData.TxnInfo.TxnHeader.TxnAppliedDiscValue = "0.00";
        fintxnUploadData.TxnInfo.TxnHeader.TxnCouponSupervisorID = "";
        fintxnUploadData.TxnInfo.TxnHeader.TxnDiscAppliedTime = "";
        fintxnUploadData.TxnInfo.TxnHeader.TxnDiscSupervisorID = "";
        fintxnUploadData.TxnInfo.TxnHeader.TxnDiscValue = "";
        fintxnUploadData.TxnInfo.TxnHeader.TxnDiscValueFlag = "";
        // fintxnUploadData.TxnInfo.TxnHeader.TxnEndTime: new Date().getDate() + "/" + (new Date().getMonth() + 1)
        //   + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
        fintxnUploadData.TxnInfo.TxnHeader.TxnId = config.TxnID;
        fintxnUploadData.TxnInfo.TxnHeader.TxnMarkDownReason = "";
        fintxnUploadData.TxnInfo.TxnHeader.TxnMarkDownReasonDesc = "";
        fintxnUploadData.TxnInfo.TxnHeader.TxnSalesManID = "";
        //  fintxnUploadData.TxnInfo.TxnHeader.TxnStartTime: "",
        fintxnUploadData.TxnInfo.TxnHeader.TxnStatus = "COMPLETED";
        fintxnUploadData.TxnInfo.TxnHeader.TxnTotal = parseFloat(config.amount);//this.state.Totalp
        fintxnUploadData.TxnInfo.TxnHeader.UserId = config.userID;
        fintxnUploadData.TxnInfo.TxnHeader.VoidTxnSupervisorID = "";
        fintxnUploadData.TxnInfo.TxnHeader.ZONE = "WE";
        fintxnUploadData.TxnInfo.TxnHeader.isMDTApplied = "";;


        fintxnUploadData.CAF = "SE";//Done
        fintxnUploadData.Guid = config.guid;//Done
        fintxnUploadData.StoreNo = config.storeCode;//Done

        // cafValidation()

        calculateTax()
    }

    const calculateTax = async () => {
        let lstProduct = []
        for (let i = 0; i < fintxnUploadData.TxnInfo.TxnItemList.length; i++) {
            const element = fintxnUploadData.TxnInfo.TxnItemList[i];
            var pelement = {
                "hsnCode": element.HSN_CODE,
                "md_fg": element.MD_FG,
                "qty": element.Quantity,
                "selliingPrice": element.SellingPrice,
                "seqNo": element.SequenceID,
                "isInterState": false
            }
            lstProduct.push(pelement)

        }

        const GetTaxSummaryGST = await triggerAction(() => getTaxSummaryGSTService(lstProduct));

        if (GetTaxSummaryGST.errorCode == "00" || GetTaxSummaryGST.errorCode == "0") {
            debugger;
            fintxnUploadData.TxnInfo.TxnHeader.TxnTotal = parseFloat(GetTaxSummaryGST.txnTotal);
            config.amount = parseFloat(GetTaxSummaryGST.txnTotal);
            fintxnUploadData.TxnInfo.TxnHeader.ItemCount = lstProduct.length
            fintxnUploadData.TxnInfo.TxnItemList[0].EffectivePrice = Object.values(GetTaxSummaryGST.taxMap)[0][0].sellingPriceAfterTax;
            fintxnUploadData.TxnInfo.TxnItemList[0].TaxDetails.TaxType = Object.values(GetTaxSummaryGST.taxMap)[0][0].taxType;
            fintxnUploadData.TxnInfo.TxnItemList[0].TaxDetails.TaxCodeType = Object.values(GetTaxSummaryGST.taxMap)[0][0].taxCodeType;


            for (let i = 0; i < Object.values(GetTaxSummaryGST.taxMap)[0].length; i++) {
                const element = Object.values(GetTaxSummaryGST.taxMap)[0][i];
                let taxGST = {
                    HSN_TYPE: element.hsnType,
                    SEQUENCEID_TAX: element.sequenceID,
                    TaxAmount: element.taxAmount,
                    TaxRate: element.taxRate
                }

                fintxnUploadData.TxnInfo.TxnItemList[0].TaxDetails.TaxGSTList.push(taxGST)
            }

            debugger;


            cafValidation()
        }

    }

    const cafValidation = async () => {

        let dtTime = new Date()
        let txnUploadDtTime = dtTime.getDate() + "/" + dtTime.getMonth() + 1 + "/" + dtTime.getFullYear() + " " + dtTime.getHours() + ":" + dtTime.getMinutes() + ":" + dtTime.getSeconds()
        // var api = new APIRouter();

        CAFRequest.CAF_NUMBER = config.CAF_NUMBER;
        CAFRequest.ORN = config.ORN;
        CAFRequest.CircleId = config.userCircelId
        CAFRequest.JCID = config.JCID
        CAFRequest.DG_POA = config.DG_POA
        CAFRequest.DG_POI = config.DG_POI
        CAFRequest.DG_KYC = config.DG_KYC
        CAFRequest.DG_PIC = config.DG_PIC
        CAFRequest.DG_LTP = config.DG_LTP
        CAFRequest.Aadhar_Number = "215542599440"
        if (config.isOutstation) {
            CAFRequest.CUSTOMER_TYPE = "0005"
        }
        else {
            CAFRequest.CUSTOMER_TYPE = "0001"
        }

        let caffields =
            CAFRequest.CAF_TYPE + "|" +
            // CAFRequest.CAF_NUMBER + "|" +
            config.CAF_NUMBER + "|" +
            CAFRequest.CUSTOMER_TYPE + "|" + 
            // "0001" + "|" +
            CAFRequest.PRODUCT_ID + "|" +
            CAFRequest.RMN + "|" + 
            // "7008124658" + "|" +//for test
            // CAFRequest.ICCID + "|" +
            "NA" + "|" +
            // CAFRequest.IMSI + "|" +
            "NA" + "|" +
            CAFRequest.MSISDN + "|" +
            CAFRequest.VANITYFLAG + "|" +
            CAFRequest.CUPON_CODE + "|" +
            CAFRequest.POIFLAG + "|" +
            CAFRequest.POAFLAG + "|" +
            CAFRequest.FirstName + "|" +
            CAFRequest.MiddleName + "|" +
            CAFRequest.LastName + "|" +
            CAFRequest.DOB + "|" +
            CAFRequest.PanNo + "|" +
            CAFRequest.PLANID + "|" +
            // CAFRequest.ORN + "|" +
            config.ORN + "|" +
            CAFRequest.ACCESSTOKEN + "|" +
            CAFRequest.ISD + "|" +
            CAFRequest.IR + "|" +
            CAFRequest.SERIALNO + "|" +
            // CAFRequest.CircleId + "|" +
            config.custCircleHeader + "|" +
            CAFRequest.AadharDetails_CAF + "|" +
            CAFRequest.Ref_fName + "|" +
            CAFRequest.Ref_MName + "|" +
            CAFRequest.Ref_LName + "|" +
            CAFRequest.Ref_AddType + "|" +
            CAFRequest.Ref_ContactNumber + "|" +
            CAFRequest.Ref_buildingName + "|" +
            CAFRequest.Ref_locality + "|" +
            CAFRequest.Ref_postcode + "|" +
            CAFRequest.Ref_district + "|" +
            CAFRequest.Ref_city + "|" +
            CAFRequest.Ref_state + "|" +
            CAFRequest.Ref_country + "|" +
            CAFRequest.Upc_code + "|" +
            CAFRequest.Generation_date + "|" +
            CAFRequest.Service_provider_name + "|" +
            CAFRequest.Mnp_type + "|" +
            CAFRequest.Jiomoney_notify + "|" +
            CAFRequest.AppointmtDate + "|" +
            CAFRequest.AppointmtFromTime + "|" +
            CAFRequest.AppointmtToTime + "|" +
            CAFRequest.Email + "|" +
            CAFRequest.Subscription_change + "|" +
            CAFRequest.CustomerId + "|" +
            CAFRequest.R4GID + "|" +
            CAFRequest.Caf_Category + "|" +
            CAFRequest.Aadhar_Number + "|" +
            // config.Aadhar_Number + "|" + //for test
            // "215542599440" + "|" +
            CAFRequest.BldgName + "|" +
            CAFRequest.Locality + "|" +
            CAFRequest.LandMark + "|" +
            CAFRequest.StreetName + "|" +
            CAFRequest.PostCode + "|" +
            CAFRequest.City + "|" +
            CAFRequest.District + "|" +
            CAFRequest.State + "|" +
            CAFRequest.Country + "|" +
            CAFRequest.AadharTxnRefNum + "|" +
            CAFRequest.AadharTxnRefDateTime + "|" +
            CAFRequest.Gender + "|" +
            CAFRequest.VanityType + "|" +
            CAFRequest.DND + "|" +
            CAFRequest.ExistingConnections + "|" +
            CAFRequest.Nationality + "|" +
            CAFRequest.FFN + "|" +
            CAFRequest.FMN + "|" +
            CAFRequest.FLN + "|" +
            CAFRequest.Agent_AadharTxnRefNum + "|" +
            CAFRequest.Agent_AadharTxnRefDateTime + "|" +
            CAFRequest.CustomerAuthAadharTxnRefNum + "|" +
            CAFRequest.CustomerAuthAadharTxnRefDateTime + "|" +
            CAFRequest.RelationshipType + "|" +
            CAFRequest.CareOf + "|" +
            CAFRequest.Agent_Aadhaar + "|" +
            CAFRequest.StoreCity + "|" +
            // CAFRequest.JCID + "|" +
            config.JCID + "|" +
            CAFRequest.VanityPrice + "|" +
            CAFRequest.VanityEAN + "|" +
            CAFRequest.TermCode + "|" +
            CAFRequest.JiomoneyEKYCResponseCode + "|" +
            CAFRequest.JiomoneyekycTimestamp + "|" +
            CAFRequest.Jiomoneyauthresponsecode + "|" +
            CAFRequest.Jiomoneyauthtimestamp + "|" +
            CAFRequest.Simtype + "|" +
            CAFRequest.SubDistrict + "|" +
            CAFRequest.PostOffice + "|" +
            CAFRequest.LocalAdd_buildingName + "|" +
            CAFRequest.LocalAdd_locality + "|" +
            CAFRequest.LocalAdd_landmark + "|" +
            CAFRequest.LocalAdd_Street + "|" +
            CAFRequest.Localadd_subdistrict + "|" +
            CAFRequest.Localadd_postoffice + "|" +
            CAFRequest.Localadd_pincode + "|" +
            CAFRequest.Localadd_City + "|" +
            CAFRequest.Localadd_district + "|" +
            CAFRequest.Localadd_state + "|" +
            CAFRequest.Localadd_careof + "|" +
            CAFRequest.LocalRef_callingpartyNo + "|" +
            CAFRequest.Localref_Personcalled + "|" +
            CAFRequest.Localref_noCalled + "|" +
            CAFRequest.AgentAuthAadharTxnRefNo + "|" +
            CAFRequest.AgentAuthAadharTxnRefDateTime + "|" +
            CAFRequest.ServiceType + "|" + //for test
            // "MOBILITY" + "|" +
            CAFRequest.BuildingId + "|" +
            CAFRequest.InstallationCharges + "|" +
            CAFRequest.AgentName + "|" +
            CAFRequest.AdditionalProducts + "|" +
            CAFRequest.Aadharaddrsameinstalltion + "|" +
            CAFRequest.Inst_Wing + "|" +
            CAFRequest.Inst_Floor + "|" +
            CAFRequest.Inst_Housenameornumber + "|" +
            CAFRequest.Inst_Buildingnameornumber + "|" +
            CAFRequest.Inst_Societyname + "|" +
            CAFRequest.Inst_Areaortehsil + "|" +
            CAFRequest.Inst_Landmark + "|" +
            CAFRequest.Inst_Sublocality + "|" +
            CAFRequest.Inst_Streetnameornumber + "|" +
            CAFRequest.Inst_Pincode + "|" +
            CAFRequest.Inst_City + "|" +
            CAFRequest.Inst_District + "|" +
            CAFRequest.Inst_State + "|" +
            CAFRequest.Inst_Totalfloors + "|" +
            CAFRequest.Inst_CareOf + "|" +
            CAFRequest.SegmentTypename + "|" +
            CAFRequest.SegmentSubTypename + "|" +
            CAFRequest.SegmentCodeValue + "|" +
            CAFRequest.SegmentCodeName + "|" +
            CAFRequest.DocumentId + "|" + //for test
            // "215542599440" + "|" +
            CAFRequest.CustIncome + "|" +
            CAFRequest.CustFamilyIncome + "|" +
            CAFRequest.ReasonMultipleConnection + "|" +
            CAFRequest.AgentToken + "|" +
            CAFRequest.CustomerToken + "|" +
            CAFRequest.ChipsTinno + "|" +
            CAFRequest.IMEI + "|" +
            CAFRequest.EID + "|" +
            CAFRequest.QR_XML + "|" +
            // CAFRequest.DG_POA + "|" +
            // config.DG_POA + "|" +
            "POA;FS0002;J8369854;30-03-2020;sdvsv;Republic of India (ROI);19.167634,73.07347;2020-04-23T17:35:25;hyperverge;" + "|" +
            // CAFRequest.DG_POI + "|" +
            // config.DG_POI + "|" +
            "POI;Z00079;MH122005000088;30-03-2020;adscsc;Regional Transport Office (RTO);19.167634,73.07347;2020-04-23T17:33:17;hyperverge;" + "|" +

            // CAFRequest.DG_KYC + "|" +
            config.DG_KYC + "|" +
            // CAFRequest.DG_PIC + "|" +
            config.DG_PIC + "|" +
            // CAFRequest.DG_ATP + "|" +
            "NA" + "|" +
            CAFRequest.DG_OTP + "|" +
            CAFRequest.QR_SCAN_FLAG + "|" + "|" +
            CAFRequest.customerCreditScore + "|" +
            CAFRequest.CreditScoredate + "|" +
            //---------------------Code added for DKYC--------------
            CAFRequest.DG_APIC + "|" +
            config.DG_LTP + "|" +
            CAFRequest.DG_LRI + "|" +
            CAFRequest.DG_LRA + "|" +
            CAFRequest.RMN_RELATIONSHIP + "|" +
            CAFRequest.ALT_Contact_Type + "|" +
            "N" + "|" +
            "H"
        //--------------------End Code For DKYC----------------;

        // setfinCAFRequest(caffields);

        finCAFRequest = CAFRequest;
        // for test
        // caffields = "postpaid|MUH000C6KV|0001|1400382|8828206787|8991874101888906862|406874502073542|7021156193|Y|01||0|Sameer Shekhar Patkar|||19-03-1991||1000649|NO00000B882Q|6d1f7a51-2624-44c9-9253-22c826b2f2d2|0|0||MH||||||||||||||||||N||||s@m.com||||EKYC|215542599440|1053|Pat Highschool |SAKLESHWAR MANDIR|PAT HIGH SCHOOL|416522|MAHARASHTRA|Goa-Panaji|Maharashtra|IN|||M|NORMAL||Z02#1#####|IN| Shekhar Raghunath Patkar|||||||0001|S/O Shekhar Raghunath Patkar|836938402566|MUMBAI|INT9||||||||N|||1053|Pat Highschool |SAKLESHWAR MANDIR|PAT HIGH SCHOOL|Sindhu|MAHARASHTRA|416522|MAHARASHTRA|Goa-Panaji|MAHARASHTRA|S/O Shekhar Raghunath Patkar||||||MOBILITY|1053|0.00|Mayuri Pendhari||Y||||||||||||||||||||215542599440||||||||||POA;Z00081;GRAMPANCHAYAT;09-04-2020;Mangaon;Gram Panchayat;19.1518428,73.0789819;2020-04-10T10:04:50;hyperverge;|POI;Z00079;DRIVINGLICENCE;10-03-2020;Kudal;Regional Transport Office (RTO);19.1519316,73.0790339;2020-04-10T10:04:45;hyperverge;|O|PIC;Z00091;0;19.1518512,73.0789991;2020-04-10T10:04:55;||OTP;Z00092;423504;19.151854,73.078953;2020-04-10T11:04:22;8828206787;2020-04-10T11:04:18;|0|||||LTP;Z00092;156932;19.1518945,73.0789651;2020-04-10T11:04:18;9096284056;2020-04-10T11:04:18;|undefined|undefined|KNOWN PERSON|Mobile|N|H"
        setloading(true)
        const cAFValidation = await triggerAction(() => cAFValidationService(caffields));
        setloading(false)
        if (cAFValidation.ErrorCode == "00") {
            callBillDesk()

        }
        else if (cAFValidation.ErrorCode === '03' || cAFValidation.ErrorCode === '3') {
            confirmAlert({
                title: "Alert!",
                message: cAFValidation.ErrorMsg,
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => {
                            history.push('/home')
                            // logout(this, this.props, config); 
                        }
                    }
                ]
            });

        }

        else {
            confirmAlert({
                message: cAFValidation.ErrorMsg,
                buttons: [
                    {
                        label: 'OK',

                    }
                ]
            });
        }

    }

    const callBillDesk = async () => {
        debugger;
        fintxnUploadData.TxnInfo.TxnTenderList[0].Amount = config.amount;
        fintxnUploadData.TxnInfo.TxnHeader.PaymentStartTime = getCurrentDateForTxn();
        console.log("bdState :", config.bdState);
        let str = await triggerAction(() => getBilldeskModalQueryStr());
        // let bdparam = {
        //     "msg":str.msg,
        //     "options": {
        //      "enableChildWindowPosting": str.enableChildWindowPosting,
        //      "enablePaymentRetry": str.enablePaymentRetry,
        //      "retry_attempt_count": str.retry_attempt_count,
        //      "txtPayCategory": str.txtPayCategory
        //      },
        //      "callbackUrl": str.callbackUrl 
        // }

        // let bdparamStr = JSON.stringify(str)

        // let msgStr = "RRLUAT" + "|" + config.ORN + "|NA|" + config.amount + "|NA|NA|NA|INR|NA|R|rrluat|NA|NA|F|NA|NA|NA|NA|NA|NA|NA|NA|";
        // const fullMsg = msgStr + hmacshaChecksum(msgStr);
        // console.log("fullMsg : ", fullMsg);
        // window.bdPayment.initialize ({
        //     "msg":fullMsg,
        //     "options": {
        //      "enableChildWindowPosting": true,
        //      "enablePaymentRetry": true,
        //      "retry_attempt_count": 2,
        //      "txtPayCategory": "NETBANKING"
        //      },
        //      "callbackUrl": "http://devfin.ril.com:8080/HealthService/OrderPlacedBillDesk"
        //     });

        

        debugger;
        // let encryptbdStr = await triggerAction(() => getBilldeskQueryStr(str));
        // var popup = window.open("https://localhost:9003/child?str=" + encryptbdStr, "Popup", "width=300,height=100");
        var popup;
        // popup = window.open("https://localhost:9003/child?str=" + encryptbdStr, "Popup", "width=300,height=100");
        popup = window.open("https://localhost:9003/child", "Popup", "width=300,height=100");
       

        

        var timer = setInterval(function () {

            // try{
            // if(popup.origin.startsWith("https://localhost:9003")){

            if (popup.document.getElementById('bMsg') && !popup.document.getElementById('bMsg').value){
                popup.document.getElementById('bMsg').value = str.msg
                popup.document.getElementById('startbd').click()
            }
            if (popup.document.getElementById('txtSuccess') && popup.document.getElementById('txtSuccess').value) {

                config.successtxnid = popup.document.getElementById('txtSuccess').value
                // document.getElementById('btn').disabled = false;
                confirmAlert({
                    title: 'Success!!',
                    message: 'txn successfull with txnid : ' + popup.document.getElementById('txtSuccess').value,
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { UploadTxnData() }
                        },
                    ]
                })
                popup.close();
            }
            if (popup.document.getElementById('txtFail') && popup.document.getElementById('txtFail').value) {
                // document.getElementById('btn').disabled = false;
                confirmAlert({
                    title: 'Fail!!',
                    // message: 'txn failed with txnid : ' + popup.document.getElementById('txtFail').value,
                    message : "Sorry!! We could not process your payment.Please try again.",
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { return (false) }
                        },
                    ]
                })
                popup.close();
            }
            // }

            // }
            // catch(e){

            // }

            if (popup.closed) {
                clearInterval(timer);
                // alert('closed');
            }
        }, 1000);

        popup.focus();

        // window.bdPayment.initialize ({
        //     "msg": str.msg,
        //     "options": {
        //      "enableChildWindowPosting": true,
        //      "enablePaymentRetry": true,
        //      "retry_attempt_count": 2,
        //      "txtPayCategory": "NETBANKING"
        //      },
        //      "callbackUrl": str.callbackUrl
        //     });


        // window.bdPayment.initialize ({
        //     "msg":"RRLUAT|NO00000B8AE8|NA|1098|NA|NA|NA|INR|NA|R|rrluat|NA|NA|F|NA|NA|NA|NA|NA|NA|NA|NA|5C747B9372C8B123A14C5120EDDEB680754E95E708B7B31A854787485A71A804",
        //     "options": {
        //      "enableChildWindowPosting": true,
        //      "enablePaymentRetry": true,
        //      "retry_attempt_count": 2,
        //      "txtPayCategory": "NETBANKING"
        //      },
        //      "callbackUrl": "http://devfin.ril.com:8080/HealthService/OrderPlacedBillDesk"
        //     });

        // let str = await triggerAction(() => getBilldeskQueryStr());




    }

    //for after txn
    const UploadTxnData = async () => {
        fintxnUploadData.TxnInfo.TxnHeader.PaymentEndTime = getCurrentDateForTxn()
        fintxnUploadData.TxnInfo.TxnHeader.TxnEndTime = getCurrentDateForTxn()
        fintxnUploadData.TxnInfo.TxnHeader.receiptRefID = config.JCID + config.posid + getFourDigitsTxnId("1") + getCurrentDateForReceipt();
        fintxnUploadData.TxnInfo.TxnHeader.ReceiptTextPath = "C:\\RPOSStoreReceipt\\" + getCurrentDateForReceipt() + "\\" + fintxnUploadData.TxnInfo.TxnHeader.receiptRefID + ".txt";

        debugger;
        var Request = {
            "CAF": "SE",
            CAFRequest: finCAFRequest,
            "Guid": config.guid,
            "StoreNo": config.storeID,
            "Toast": "98697523",
            TxnInfo: fintxnUploadData.TxnInfo
        }

        // if (config.planType === 'B') {
        //   config.OrderType = 'BILLPAY';
        //   Request.BillPayRequest = this.props.props.globalState.BillPayRequest
        // } else {
        //   if (config.planType === 'R') {
        //     Request.objRechargeTopUpAddonRequest = objRechargeTopUpAddonRequest;

        //     config.OrderType = 'RECHARGE'
        //   }
        //   else if (config.planType === 'T') {
        //     Request.objRechargeTopUpAddonRequest = objRechargeTopUpAddonRequest;

        //     config.OrderType = 'TOPUP'
        //   }
        //   else if (config.planType === 'A') {
        //     Request.objRechargeTopUpAddonRequest = objRechargeTopUpAddonRequest;

        //     config.OrderType = 'ADDON'
        //   }
        //   else if (config.planType === 'C') {
        config.OrderType = 'DIB'
        //   }
        // }

        setloading(true)
        const uploadTxnDataNextGen = await triggerAction(() => uploadTxnDataNextGenService(Request));
        setloading(false)


        if (uploadTxnDataNextGen.Errorcode === '0' || uploadTxnDataNextGen.Errorcode === '00') {
            history.push('/OrderPlaced')

        }
        else if (uploadTxnDataNextGen.ErrorCode === '03' || uploadTxnDataNextGen.ErrorCode === '3') {
            confirmAlert({
                title: "Alert!",
                message: uploadTxnDataNextGen.Statusmsg,
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => {
                            history.push('/home')
                        }
                    }
                ]
            });

        }

        else {

            confirmAlert({
                title: "Alert!",
                message: uploadTxnDataNextGen.Statusmsg,
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false }
                    }
                ]
            });

        }


    }


    const uploadDocuments = async () => {

        const uploadPOIFront = await triggerAction(() => uploadDocumentService("CUST_EKYC", config.poiImage.frontImage));
        const uploadPOIBack = await triggerAction(() => uploadDocumentService("CUST_EKYC_CONSENT", config.poiImage.backImage));
        const uploadCustImg = await triggerAction(() => uploadDocumentService("CUST_IMG ", config.custCaptureImage.frontCustImg));

    }





    return (
        <div>
            <div class="my_app_container">
                {FixedHeader()}
                <div class="rechargehome_wrapper">

                    <div class="container">

                        <div class="">
                            <div class="row">
                                <div class="col">
                                    <section class="card-view-sm mt-3">
                                        <div class="md-font f-16 pl-3 pb-2">Customer OTP validation</div>
                                        <div class="card shadow-sm">
                                            <div class="card-body">
                                                <div className="spin">
                                                    <Spinner visible={loading}
                                                        spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                                                </div>
                                                <div class="row no-gutters">
                                                    <div class="col-12">
                                                        <form action="" class="">
                                                            <div class="login">
                                                                {/* <div class="form-group mb-4">
                                            <span class="remove-no"> <img class="img-fluid" src={require("../../img/pos/icon-remove.png")} width="16px" height="16px"/></span>
                                            <input type="text" id="user-name" class="jio-form-control" placeholder=" "/>
											<label for="user-name" class="control-label">10 digit mobile number</label>
                                            </div> */}

                                                                <div class="form-group mb-5">
                                                                    {doneC
                                                                        ?
                                                                        <a id="rCust" style={{ "float": "right", "color": "#28a3ae", "cursor": "pointer" }}
                                                                            onClick={(e) => ResendOTP(e, "cust")}
                                                                        >Resend OTP </a>
                                                                        :
                                                                        <a id="rCust" style={{ "float": "right", "color": "#BFBBBA" }}
                                                                        >Resend OTP </a>
                                                                    }
                                                                    <input id="custOtp" name="custOtp" type="text"
                                                                        required="required"
                                                                        onChange={(e) => setOtp(e, "custOtp")}
                                                                        pattern="^[1-9]\d*$"
                                                                        maxLength="6"
                                                                        value={custOtp} autoComplete="off" />
                                                                    {/* {this.validator.message('custOtp', this.state.custOtp, 'required')} */}

                                                                    {time.s > 9 ?
                                                                        <div id="custTime" style={{ "float": "left", "fontSize": "11px" }}>
                                                                            <button onClick={(e) => startTimer(e)} id="scust" hidden>Start</button>0{time.m}:{time.s}
                                                                        </div>
                                                                        :
                                                                        <div id="custTime" style={{ "float": "left", "fontSize": "11px" }}>
                                                                            <button onClick={(e) => startTimer(e)} id="scust" hidden>Start</button>0{time.m}:0{time.s}
                                                                        </div>
                                                                    }

                                                                    <label for="custOtp" class="control-label">Customer OTP</label>
                                                                </div>

                                                                {/* <div class="form-group mb-4">
                                            <span class="remove-no"><img class="img-fluid" src={require("../../img/pos/icon-remove.png")} width="16px" height="16px"/></span>
                                            <input type="text" id="user-name" class="jio-form-control" placeholder=" "/>
											<label for="user-name" class="control-label">Re-enter 10 digit mobile number</label>
                                            </div> */}

                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <section class="card-view-sm mt-3">
                                        <div class="md-font f-16 pl-3 pb-2">Customer Consent</div>
                                        <div class="card shadow-sm">
                                            <div class="card-body">
                                                <div class="row no-gutters">
                                                    <div class="col-12">
                                                        <form action="" class="">
                                                            <div class="login">
                                                                {/* <div class="form-group mb-4">
                                            <span class="remove-no"> <img class="img-fluid" src={require("../../img/pos/icon-remove.png")} width="16px" height="16px"/></span>
                                            <input type="text" id="user-name" class="jio-form-control" placeholder=" "/>
											<label for="user-name" class="control-label">10 digit mobile number</label>
                                            </div> */}

                                                                <div>

                                                                    <input type="checkbox" id="chkC" style={{ "float": "left" }} onClick={(e) => {
                                                                        if (document.getElementById('chkC').checked === true)
                                                                            setdisplayConsent(true)
                                                                        else {
                                                                            setdisplayConsent(false)
                                                                        }
                                                                    }} />

                                                                    <label for="chkC"></label>

                                                                    <div style={{ "float": "left", "paddingLeft": "22px", "paddingTop": "1px" }}>I have read the customer consent</div>

                                                                </div>
                                                                <br />

                                                                {/* <div class="form-group">
                                                                            <input id="iccid" name="iccid" type="text"
                                                                                onChange={(e) => setOtp.bind(this, "iccid")}
                                                                                autocomplete="off"
                                                                                pattern="^[1-9]\d*$"
                                                                                maxLength="5"
                                                                                value={this.state.iccid} required="required" />
                                                                            {this.validator.message('iccid', this.state.iccid, 'required|integer')}

                                                                            <label for="iccid" class="control-label">Enter last 5 digits of ICCID.</label>
                                                                        </div> */}

                                                                {/* <div class="form-group mb-4">
                                            <span class="remove-no"><img class="img-fluid" src={require("../../img/pos/icon-remove.png")} width="16px" height="16px"/></span>
                                            <input type="text" id="user-name" class="jio-form-control" placeholder=" "/>
											<label for="user-name" class="control-label">Re-enter 10 digit mobile number</label>
                                            </div> */}

                                                            </div>
                                                        </form>


                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </section>
                                    <div class="form-group text-center mt-5 mb-0">
                                        <button type="button" onClick={(e) => validateDigitalKycOTP(e, custOtp)}
                                            class="btn jio-btn jio-btn-primary w-100" disabled={loading}>Validate OTP</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
                {/* <FixedFooter></FixedFooter> */}
            </div>
            <div class="modal fade show oy" id="myModal" style={displayConsent ? display : hide}>
                <div class="modal-backdrop fade show"></div>
                <div class="modal-dialog" style={{ zIndex: "inherit" }}>
                    <div class="modal-content" style={{ height: "97vh" }}>
                        <div class="text-center">
                            <h6 class="modal-title mt-10"><b>Customer Constent</b></h6>
                        </div>
                        <div class="pt-0 mt-10" style={{ height: "750px", padding: "20px" }}>
                            <Scrollbars style={{ height: 500 }}>
                                <div class="text-left display-linebreak">
                                    <p style={{ color: "black" }}>{constants.customerContent}</p>
                                </div>
                            </Scrollbars>
                            <div class="cust-dtl" style={{ marginTop: "-40px" }}>

                                <div class="row mt-40">
                                    <div class="col-12 col-sm-12">
                                        <a class="jio-btn jio-btn-primary w-100" style={{ color: "white" }}
                                            onClick={(e) => { setdisplayConsent(false) }}>Ok</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="modal fade show oy" id="otpValSuccess" style={displayOTPSuccess ? display : hide}
            >
                <div class="modal-backdrop fade show"></div>
                <div class="modal-dialog" style={{ zIndex: "inherit" }}>
                    <div class="modal-content">

                        <div class="row">
                            <div class="col">
                                <div class="card shadow-sm mt-3">

                                    <div class="card-body">
                                        <form>
                                            <div class="status-frame text-center d-flex align-items-center">
                                                <div class="text-center mx-auto">
                                                    <div class="icon-page-status"><img src="./img/pos/success-green.png" alt="success" /></div>
                                                    <h3 class="supporting-c2 f-18 mt-3 mb-3 pb-3">OTP Validated Successfully.</h3>

                                                    <br></br>
                                                    <br></br>
                                                    Press proceed to continue.
                                                    <div>
                                                        <div class="row m-0 mt-4">
                                                            <div class="col-12 p-2">
                                                                <button type="button"
                                                                    onClick={(e) => getCAFNumber(e)}
                                                                    class="btn-block jio-btn jio-btn-primary" disabled={loading}>PROCEED</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    )
}

export default CustOTP