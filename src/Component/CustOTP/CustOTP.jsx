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
import { getCurrentDateForPOAPOI, getCurrentDateForTxn } from '../../commom/CommonMethods';

import checkMobile from '../../services/checkMobile';
import validateOTP from '../../services/validateOTP';
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


var GSON = require('gson');

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

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

    const history = useHistory();
    const geolocation = useGeolocation()

    useEffect(() => {
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
            send_Cust_Agent("send_Customer");
        }

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
        // setLoading(true)
        const callValidateOTP = await triggerAction(() => validateOTP(config.custNumber, custOtp, config.ORN));
        // setLoading(false)

        if (callValidateOTP.errorCode === "00") {

            const currentDateTime = getCurrentDateForPOAPOI()

            CAFRequest.DG_OTP = "OTP;Z00092;423504;" + geolocation.latitude + "," + geolocation.longitude + ";" + currentDateTime + ";" + CAFRequest.RMN + ";" + config.OTPGenTime + ";"
            CAFRequest.DG_ATP = "ATP;Z00092;520048;" + geolocation.latitude + "," + geolocation.longitude + ";" + currentDateTime + ";" + config.agentMobile + ";" + config.OTPGenTime + ";"

            
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

    const cafValidation = async () => {

        let dtTime = new Date()
        let txnUploadDtTime = dtTime.getDate() + "/" + dtTime.getMonth() + 1 + "/" + dtTime.getFullYear() + " " + dtTime.getHours() + ":" + dtTime.getMinutes() + ":" + dtTime.getSeconds()
        // var api = new APIRouter();

        debugger;
        let caffields =
            CAFRequest.CAF_TYPE + "|" +
            // CAFRequest.CAF_NUMBER + "|" +
            config.CAF_NUMBER + "|" +
            CAFRequest.CUSTOMER_TYPE + "|" +
            CAFRequest.PRODUCT_ID + "|" +
            // CAFRequest.RMN + "|" + //for test
            "7008124658" + "|" +
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
            // CAFRequest.Aadhar_Number + "|" +
            config.Aadhar_Number + "|" +
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
            CAFRequest.JCID + "|" +
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
            CAFRequest.ServiceType + "|" +
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
            CAFRequest.DocumentId + "|" +
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
            config.DG_POA + "|" +
            // CAFRequest.DG_POI + "|" +
            config.DG_POI + "|" +
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
            CAFRequest.DG_LTP + "|" +
            CAFRequest.DG_LRI + "|" +
            CAFRequest.DG_LRA + "|" +
            CAFRequest.RMN_RELATIONSHIP + "|" +
            CAFRequest.ALT_Contact_Type + "|" +
            "N" + "|" +
            "H"
        //--------------------End Code For DKYC----------------;

        // for test
        // caffields = "postpaid|MUH000C6KV|0001|1400382|8828206787|8991874101888906862|406874502073542|7021156193|Y|01||0|Sameer Shekhar Patkar|||19-03-1991||1000649|NO00000B882Q|6d1f7a51-2624-44c9-9253-22c826b2f2d2|0|0||MH||||||||||||||||||N||||s@m.com||||EKYC|215542599440|1053|Pat Highschool |SAKLESHWAR MANDIR|PAT HIGH SCHOOL|416522|MAHARASHTRA|Goa-Panaji|Maharashtra|IN|||M|NORMAL||Z02#1#####|IN| Shekhar Raghunath Patkar|||||||0001|S/O Shekhar Raghunath Patkar|836938402566|MUMBAI|INT9||||||||N|||1053|Pat Highschool |SAKLESHWAR MANDIR|PAT HIGH SCHOOL|Sindhu|MAHARASHTRA|416522|MAHARASHTRA|Goa-Panaji|MAHARASHTRA|S/O Shekhar Raghunath Patkar||||||MOBILITY|1053|0.00|Mayuri Pendhari||Y||||||||||||||||||||215542599440||||||||||POA;Z00081;GRAMPANCHAYAT;09-04-2020;Mangaon;Gram Panchayat;19.1518428,73.0789819;2020-04-10T10:04:50;hyperverge;|POI;Z00079;DRIVINGLICENCE;10-03-2020;Kudal;Regional Transport Office (RTO);19.1519316,73.0790339;2020-04-10T10:04:45;hyperverge;|O|PIC;Z00091;0;19.1518512,73.0789991;2020-04-10T10:04:55;||OTP;Z00092;423504;19.151854,73.078953;2020-04-10T11:04:22;8828206787;2020-04-10T11:04:18;|0|||||LTP;Z00092;156932;19.1518945,73.0789651;2020-04-10T11:04:18;9096284056;2020-04-10T11:04:18;|undefined|undefined|KNOWN PERSON|Mobile|N|H"

        const cAFValidation = await triggerAction(() => cAFValidationService(caffields));

        if (cAFValidation.ErrorCode == "00") {
            // this.props.props.history.push({
            //     pathname: '/PaymentMode',
            // });

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

        const getTransactionId = await triggerAction(() => getTransactionIdService());

        if (getTransactionId.ErrorCode === "00"
            //&& DecryptedResponse.availabilityStatus == "1"
        ) {

            setTxnID(getTransactionId.TxnID)
            config.TxnID = getTransactionId.TxnID
            config.TaxInvoice = getTransactionId.TaxInvoice;
            txnUploadData.TxnInfo.TxnHeader.TxnStartTime = getCurrentDateForTxn();
            txnUploadData.TxnInfo.TxnHeader.LogonTime = getCurrentDateForTxn();
            callGetItemMrpDetailsRPOS(getTransactionId); //for test
            // uploadDocuments()
            // cafValidation() //for test
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

        const getItemMrpDetailsRPOS = await triggerAction(() => getItemMrpDetailsRPOSService(PlanselectionModel.PRODUCT_ID));

        if (getItemMrpDetailsRPOS.Errorcode == "00" || getItemMrpDetailsRPOS.Errorcode == "0") {
            const arrayResponse = []
            arrayResponse.push(getItemMrpDetailsRPOS)
            setTxnitemList(arrayResponse, txnRes)
            //uploadDocuments()
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
                    // AddlDetailsList:[
                    // ],
                    // TaxCodeType: "TAX_TYPE_INCL",
                    // TaxGSTList:[
                    //     // {
                    //     //     HSN_TYPE : "JOSG",
                    //     //     SEQUENCEID_TAX: "1",
                    //     //     TaxAmount: "0",
                    //     //     TaxRate: "0"
                    //     // },
                    //     // {
                    //     //     HSN_TYPE : "JOCG",
                    //     //     SEQUENCEID_TAX: "1",
                    //     //     TaxAmount: "0",
                    //     //     TaxRate: "0"
                    //     // }
                    // ],
                    // TaxType: "TAX_TYPE_PERCENTAGE",
                    // TaxableAmount: "0.00"
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

        setTxnHeader(txnRes);
    }

    const setTxnHeader = (txnRes) => {

        txnUploadData.TxnInfo.TxnHeader.Area = "";
        txnUploadData.TxnInfo.TxnHeader.BalanceLoyaltyPoints = "";
        txnUploadData.TxnInfo.TxnHeader.BillOfSupply = txnRes.BillOfSupply;
        txnUploadData.TxnInfo.TxnHeader.BlockNo = "";
        txnUploadData.TxnInfo.TxnHeader.BuildingName = "";
        txnUploadData.TxnInfo.TxnHeader.ChangeDue = "0.00";
        txnUploadData.TxnInfo.TxnHeader.City = "";
        txnUploadData.TxnInfo.TxnHeader.ContactNumber = CAFRequest.MSISDN
        txnUploadData.TxnInfo.TxnHeader.CouponID = "";
        txnUploadData.TxnInfo.TxnHeader.CouponType = "";
        txnUploadData.TxnInfo.TxnHeader.CouponValue = "";
        txnUploadData.TxnInfo.TxnHeader.CouponValueParam = "";
        txnUploadData.TxnInfo.TxnHeader.CouponValueType = "";
        txnUploadData.TxnInfo.TxnHeader.CurReferenceID = "";
        txnUploadData.TxnInfo.TxnHeader.CustomerID = "";
        txnUploadData.TxnInfo.TxnHeader.CustomerName = CAFRequest.FirstName + " " + CAFRequest.MiddleName + " " + CAFRequest.LastName;
        txnUploadData.TxnInfo.TxnHeader.DeviceId = config.storeID + config.posid; //add device id
        txnUploadData.TxnInfo.TxnHeader.DoctorsAdd1 = "";
        txnUploadData.TxnInfo.TxnHeader.DoctorsAdd2 = "";
        txnUploadData.TxnInfo.TxnHeader.DoctorsAdd3 = "";
        txnUploadData.TxnInfo.TxnHeader.DoctorsName = "";
        txnUploadData.TxnInfo.TxnHeader.ESOrderID = CAFRequest.ORN;
        txnUploadData.TxnInfo.TxnHeader.EmailID = CAFRequest.Email
        txnUploadData.TxnInfo.TxnHeader.EmailId = CAFRequest.Email
        txnUploadData.TxnInfo.TxnHeader.FlatNo = "";
        txnUploadData.TxnInfo.TxnHeader.FloorNo = "";
        txnUploadData.TxnInfo.TxnHeader.IDProofCaptureStatus = "";
        txnUploadData.TxnInfo.TxnHeader.IsAddressCaptured = "";
        txnUploadData.TxnInfo.TxnHeader.IsCouponApplied = "";
        txnUploadData.TxnInfo.TxnHeader.IsIDProofRequiredFlag = "";
        txnUploadData.TxnInfo.TxnHeader.IsLoyaltyCardCaptured = "";
        txnUploadData.TxnInfo.TxnHeader.IsLoyaltyRedeemed = "";
        txnUploadData.TxnInfo.TxnHeader.IsValidLoyaltyRedemption = "";
        txnUploadData.TxnInfo.TxnHeader.IsVatExtra = "";
        txnUploadData.TxnInfo.TxnHeader.ItemCount = "2";
        txnUploadData.TxnInfo.TxnHeader.LogonTime = "";
        txnUploadData.TxnInfo.TxnHeader.LoyaltyCardNumber = "";
        txnUploadData.TxnInfo.TxnHeader.MNP_MSISDN = "";
        txnUploadData.TxnInfo.TxnHeader.OrderType = "DIB";
        txnUploadData.TxnInfo.TxnHeader.PanCardNo = "";
        txnUploadData.TxnInfo.TxnHeader.PatientsAdd1 = "";
        txnUploadData.TxnInfo.TxnHeader.PatientsAdd2 = "";
        txnUploadData.TxnInfo.TxnHeader.PatientsAdd3 = "";
        txnUploadData.TxnInfo.TxnHeader.PatientsName = "";
        // txnUploadData.TxnInfo.TxnHeader.PaymentEndTime= "";
        // txnUploadData.TxnInfo.TxnHeader.PaymentStartTime= "";
        txnUploadData.TxnInfo.TxnHeader.Pincode = "";
        txnUploadData.TxnInfo.TxnHeader.PlotNo = "";
        txnUploadData.TxnInfo.TxnHeader.ProductVersion = "10.4.7";
        txnUploadData.TxnInfo.TxnHeader.PromoTotal = "";
        txnUploadData.TxnInfo.TxnHeader.ReceiptRefID = "";
        txnUploadData.TxnInfo.TxnHeader.ReceiptTextPath = "";
        txnUploadData.TxnInfo.TxnHeader.RedeemAmount = "";
        txnUploadData.TxnInfo.TxnHeader.RefundTxnSupervisorID = "";
        txnUploadData.TxnInfo.TxnHeader.RoundOffAmount = "";
        txnUploadData.TxnInfo.TxnHeader.RoundOffConfigValue = "";
        txnUploadData.TxnInfo.TxnHeader.Sector = "";
        txnUploadData.TxnInfo.TxnHeader.SocietyName = "";
        txnUploadData.TxnInfo.TxnHeader.State = "";
        txnUploadData.TxnInfo.TxnHeader.Street = "";
        txnUploadData.TxnInfo.TxnHeader.Supply_State_Code = "";
        txnUploadData.TxnInfo.TxnHeader.TaxInvoice = txnRes.TaxInvoice;
        txnUploadData.TxnInfo.TxnHeader.TaxableAmount = "0.00";
        txnUploadData.TxnInfo.TxnHeader.TransactionType = "SALE";
        txnUploadData.TxnInfo.TxnHeader.TxnAppliedDiscValue = "0.00";
        txnUploadData.TxnInfo.TxnHeader.TxnCouponSupervisorID = "";
        txnUploadData.TxnInfo.TxnHeader.TxnDiscAppliedTime = "";
        txnUploadData.TxnInfo.TxnHeader.TxnDiscSupervisorID = "";
        txnUploadData.TxnInfo.TxnHeader.TxnDiscValue = "";
        txnUploadData.TxnInfo.TxnHeader.TxnDiscValueFlag = "";
        // txnUploadData.TxnInfo.TxnHeader.TxnEndTime: new Date().getDate() + "/" + (new Date().getMonth() + 1)
        //   + "/" + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds(),
        txnUploadData.TxnInfo.TxnHeader.TxnId = txnRes.TxnID;
        txnUploadData.TxnInfo.TxnHeader.TxnMarkDownReason = "";
        txnUploadData.TxnInfo.TxnHeader.TxnMarkDownReasonDesc = "";
        txnUploadData.TxnInfo.TxnHeader.TxnSalesManID = "";
        //  txnUploadData.TxnInfo.TxnHeader.TxnStartTime: "",
        txnUploadData.TxnInfo.TxnHeader.TxnStatus = "COMPLETED";
        txnUploadData.TxnInfo.TxnHeader.TxnTotal = parseFloat(config.amount);//this.state.Totalp
        txnUploadData.TxnInfo.TxnHeader.UserId = config.userID;
        txnUploadData.TxnInfo.TxnHeader.VoidTxnSupervisorID = "";
        txnUploadData.TxnInfo.TxnHeader.ZONE = "WE";
        txnUploadData.TxnInfo.TxnHeader.isMDTApplied = "";;


        txnUploadData.CAF = "Y";//Done
        txnUploadData.Guid = config.guid;//Done
        txnUploadData.StoreNo = config.storeCode;//Done

        cafValidation()
    }

    const uploadDocuments = async () => {

        const uploadPOIFront = await triggerAction(() => uploadDocumentService("CUST_EKYC", config.poiImage.frontImage));
        const uploadPOIBack = await triggerAction(() => uploadDocumentService("CUST_EKYC_CONSENT", config.poiImage.backImage));


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
                                                                        value={custOtp} />
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
                                            class="btn jio-btn jio-btn-primary w-100" >Validate OTP</button>
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
                                                                    class="btn-block jio-btn jio-btn-primary">PROCEED</button>
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