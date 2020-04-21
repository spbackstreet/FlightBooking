import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { confirmAlert } from 'react-confirm-alert';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-spinner-material';
import SimpleReactValidator from 'simple-react-validator';
import { errorMsg } from '../../commom/errorMsg';
import { FixedHeader } from '../../commom/FixedHeader';
import PlanselectionModel from '../../commom/Modal/PlanselectionModel';
import config from '../../config';
import '../../css/style.css';
import useGlobalState from '../../hooks/useGlobalState';
import useLoader from '../../hooks/useLoader';
import GlobalPOAModel from '../../Model/POAModel';
import GlobalPOIModel from '../../Model/POIModel';
import BlockMSISDNservice from '../../services/BlockMSISDNservice';
import checkMobile from '../../services/checkMobile';
import getmobilityPlanservice from '../../services/getmobilityPlanservice';
import SendValidateOTP_KYCservice from '../../services/SendValidateOTP_KYCservice';
// import CustomerModel from '../../CustomerDetails/Model/CustomerModel';
import validateICCIDservice from '../../services/validateICCIDservice';
import getMNPservice from '../../services/getMNPservice';
import vanityNumberservice from '../../services/vanityNumberservice';
import CAFRequest from "../../txnUploadData/cafRequest";
import txnUploadData from '../../txnUploadData/txnUploadData';
import uploadDocuments from "../../txnUploadData/uploadDocuments";
import './aadharSimcoonection.css';
import './Planselection.css';
import useGeolocation from 'react-hook-geolocation'
import { getCurrentDateForPOAPOI, getCurrentDateForTxn } from '../../commom/CommonMethods';

import { showErrorAlert } from '../../commom/commonMethod';


const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const Planselection = () => {

    const history = useHistory()
    // const [{ app: { pincode, custLocalAdd, isOutstation, selectedDocObject, poaList, ORN, customerName, custNumber,custLocalRefAdd,custPermAdd } }, dispatch] = useGlobalState();
    const [triggerAction] = useLoader();


    const [userid, setUserid] = useState('')
    const [lstSegmentPlan, setlstSegmentPlan] = useState([])
    const [lstPlan, setlstPlan] = useState([])
    const [Search, setSearch] = useState('')
    const [displayCustDet, setdisplayCustDet] = useState(false)
    const [simCirclecode, setsimCirclecode] = useState('')
    const [simEAN, setsimEAN] = useState('')
    const [simICCID, setsimICCID] = useState('')
    const [simIMSI, setsimIMSI] = useState('')
    const [simMSISDN, setsimMSISDN] = useState('')
    const [isIncomeAndReasonCaptured, setisIncomeAndReasonCaptured] = useState(false)
    const [income_reason_layout, setincome_reason_layout] = useState(false)
    const [TelcoOperatorSelected, setTelcoOperatorSelected] = useState('')
    const [displayOtrCon, setdisplayOtrCon] = useState(false)
    let [agentCircleJKorNE, setagentCircleJKorNE] = useState(false)
    let [noOfConnections, setnoOfConnections] = useState(0)
    const [otr, setotr] = useState(false)
    const [iccid, seticcid] = useState('')
    const [LstOperators, setLstOperators] = useState([])
    const [lstTelcoSelected, setlstTelcoSelected] = useState([])
    const [connection_details_dialog, setconnection_details_dialog] = useState(false)
    const [lovArray, setlovArray] = useState(["Select RelationShip", "Self", "Spouse", "Father", "Mother", "Brother", "Sister", "Son", "Daughter", "Husband"])
    const [selectedLov, setselectedLov] = useState("")
    const [relationShipLOV, setrelationShipLOV] = useState("")
    const [categoryName, setcategoryName] = useState("")
    const [lstFRC, setlstFRC] = useState([])
    const [loading, setloading] = useState(false)
    const [isPlanselected, setisPlanselected] = useState(false)
    const [DeviceDate, setDeviceDate] = useState('')
    const [time, settime] = useState({})
    const [timeA, settimeA] = useState({})
    const [seconds, setseconds] = useState(30)
    const [secondsA, setsecondsA] = useState(30)
    const [PRODUCT_ID, setPRODUCT_ID] = useState('')
    const [POS_DESC, setPOS_DESC] = useState('')
    const [SELLINGPRICE, setSELLINGPRICE] = useState('')
    const [selectPlan, setselectPlan] = useState(false)
    const [openQRWindow, setopenQRWindow] = useState(false)
    const [custOtp, setcustOtp] = useState('')
    const [agOtp, setagOtp] = useState('')
    const [planType, setplanType] = useState('')
    const [isOpen, setisOpen] = useState(false)
    const [lstMNP, setlstMNP] = useState([])
    const [cocpselected, setcocpselected] = useState(false)
    const [mnpSelect, setmnpSelect] = useState([])
    const [msg, setmsg] = useState('')
    const [msgCust, setmsgCust] = useState('');
    const geolocation = useGeolocation()
    const [noOFConnectionValueOperator,setNoOFConnectionValueOperator]=useState('')
    const [operatorName,setOperatorName]=useState('')

    let validator = new SimpleReactValidator();

    useEffect(() => {

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        var Finaldate = (date + "-" + '0' + month + "-" + year + " " + hours + ":" + min + ":" + sec);

        setDeviceDate(Finaldate)
        //added by cc
        let timeLeftVar = secondsToTime(seconds);
        let timeLeftVarA = secondsToTime(secondsA);
        settime(timeLeftVar)
        settimeA(timeLeftVarA)

        getTelcoProvider();
        if (config.objSupervisorLogin.Circle_Response.CircleId != undefined &&
            config.objSupervisorLogin.Circle_Response.CircleId === 'JK' ||
            config.objSupervisorLogin.Circle_Response.CircleId === 'NE' ||
            config.objSupervisorLogin.Circle_Response.CircleId === 'AS') {
            setagentCircleJKorNE(true)

        } else {
            setagentCircleJKorNE(false)
        }

    }, []);



    const doScan = (e) => {
        e.preventDefault();
        if (window.Mobile) {
            console.log("NEELAM1 " + config.userID)

            window.Mobile.handleScanQR();
        }
    }

    const handleScan = (e) => {
        e.preventDefault();
        var data = document.getElementById('QRDATA').value;
        // handleScanSIM(data)
    }

    // const callValidator = (frm, e) => {

    //     var validator = new SimpleReactValidator();
    //     validator.message('FirstName', frm.FirstName.value, 'required');
    //     if (validator.allValid()) {
    //         return true;

    //     }
    //     else {
    //         var errorMsgList = validator.getErrorMessages();
    //         errorMsgList = errorMsg(errorMsgList);
    //         confirmAlert({
    //             message: errorMsgList[1],
    //             buttons: [
    //                 {
    //                     label: 'Ok',
    //                     onClick: () => document.getElementById(errorMsgList[0]).focus()
    //                 },

    //             ]

    //         });
    //         e.preventDefault();
    //         return false;
    //     }

    // }

    const charcheck = (e) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            setUserid(e.target.value)
        }

    }
    const onChange = e => {
        setSearch(e.target.value)

    }
    const showPlanselected = (e, PRODUCT_ID, POS_DESC, SELLINGPRICE, lstFRC) => {
       
        if (lstFRC.length >= 1) {
            var FRC = []
            for (let x = 0; x < lstFRC.length; x++) {
                FRC.push(lstFRC[x].frcID)
            }
            setPRODUCT_ID(PRODUCT_ID);
            setPOS_DESC(POS_DESC);
            setSELLINGPRICE(SELLINGPRICE)
            setlstFRC([...FRC])
            setselectPlan(false)
            setisPlanselected(true)

            callVanityNumber()
        }
        else {
            setselectPlan(false)
            confirmAlert({
                message: 'Failed to fetch FRC.',
                buttons: [
                    {
                        label: 'Ok',
                    },

                ]

            });
        }
    }
    const constentConfirm = () => {

    }
    const lstPlanFRCValidator = (frm, e) => {

        var validator = new SimpleReactValidator();
        validator.message('Plan', document.getElementById('lstFRC').value, 'required');

        if (validator.allValid()) {
            return true;

        }
        else {
            var errorMsgList = validator.getErrorMessages();
            errorMsgList = errorMsg(errorMsgList);
            confirmAlert({
                message: errorMsgList[1],
                buttons: [
                    {
                        label: 'Ok',
                    },

                ]

            });
            e.preventDefault();
            return false;
        }

    }
    const callValidator = (frm, e) => {
        var validator = new SimpleReactValidator();
        validator.message('msisdn', document.getElementById('FRCmsisdn').value, 'required');

        if (validator.allValid()) {
            return true;

        }
        else {
            var errorMsgList = validator.getErrorMessages();
            errorMsgList = errorMsg(errorMsgList);
            confirmAlert({
                message: errorMsgList[1],
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => document.getElementById('FRC' + errorMsgList[0]).focus()
                    },

                ]

            });
            e.preventDefault();
            return false;
        }

    }

    const checkNextPlan = (frm, e) => {
// if(noOFConnectionValueOperator=="Select"){
//     showErrorAlert("Please select no of connections.")
// }else{

// }
// if(operatorName=="Select"){
//     showErrorAlert("Please select operator.")

// }
//     else{

//     }
   

       
        e.preventDefault();
        var validationCheck = lstPlanFRCValidator(frm, e);
        if (validationCheck) {
            var validationCheck1 = callValidator(frm, e);
            if (validationCheck1) {

                if (otr) {
                    rYesOtherConnection(e)
                }
                else {
                    if (planType === "Postpaid Plans") {
                        if (document.getElementById('FRCEmail')) {
                            setdisplayCustDet(true)
                        }
                        else {
                            confirmAlert({
                                message: "Please Enter EmailID",
                                buttons: [
                                    {
                                        label: 'Ok',
                                        onClick: () => document.getElementById('FRCEmail').focus()
                                    },

                                ]

                            });
                        }
                    }
                    else {
                        setdisplayCustDet(true)
                    }


                }
            }
        }
    }


    const rYesOtherConnection = (e) => {
        setisIncomeAndReasonCaptured(false)
        setnoOfConnections(0)
        setTelcoOperatorSelected("")
        // lstTelcoSelected = new ArrayList<TelcoProvidersSelectedModel>();

        //model.setOtherMobileConnections("");//not in DeviceSellModal
        //model.setNoOfConectionsForCaf("0");//not in DeviceSellModal
        //model.setNoOfConnDeDup("0");//not in DeviceSellModal

        openOtherMobileConnectionsDialog(e);

    }

    const openOtherMobileConnectionsDialog = (e) => {
        setdisplayOtrCon(true)
        if (agentCircleJKorNE) {
            document.getElementById('et_connection').value = '1'
            document.getElementById('et_connection').setEnabled = false

        } else {
            document.getElementById('et_connection').value = '1'
            document.getElementById('et_connection').setEnabled = true;
        }
    }

    const btnAdd = (e) => {
        if (document.getElementById('et_connection') === undefined ||
            document.getElementById('et_connection').value === "" ||
            document.getElementById('et_connection').value === " ") {
            confirmAlert({
                message: 'Please specify No. of Connections.',
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => { return false; }
                    },
                ]
            });

        }
        setnoOfConnections(0)
        noOfConnections = 0

        var flagnoOfConnections = noOfConnections;
        for (let i = 0; i < lstTelcoSelected.length; i++) {
            flagnoOfConnections = parseInt(flagnoOfConnections)
                + parseInt(lstTelcoSelected[i]
                    .getNoofConnections());
        }
        //for test
        agentCircleJKorNE = true;
        if (agentCircleJKorNE) {
            if (parseInt(noOfConnections)
                + parseInt(document.getElementById('et_connection').value) > 5) {
                confirmAlert({
                    message: "No. of connections cannot be greater than 5 for JK and NE.",
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => { }
                        },
                    ]
                });

                // rUtil.hideSoftKeyboard(btnAdd);
                return;
            } else {
                openNoOfConnectionDialogForJK_NE()
                // this.openNoOfConnectionDialogForJK_NE(lv_Connection,
                //         et_connection, spnTelco, adapterTelco);
            }
        } else {

            if (parseInt(noOfConnections)
                + parseInt(document.getElementById('et_connection').value) > 8) {
                confirmAlert({
                    message: "No. of connections cannot be greater than 8",
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => { }
                        },
                    ]
                });
                // rUtil.hideSoftKeyboard(btnAdd);
                return;
            } else {
                addConnection()
                // this.addConnection(lv_Connection, et_connection, spnTelco,
                //         adapterTelco, null, null, null, null, null);
            }
        }
    }

    const openNoOfConnectionDialogForJK_NE = () => {
        setconnection_details_dialog(true)
        if (isIncomeAndReasonCaptured)
            setincome_reason_layout(false)
        else
            setincome_reason_layout(true)
    }

    const btnSave = (e) => {
        var continueflag = true;
        var msg = "";
       
        if (document.getElementById('edtMobile').value.length != 10) {
            setmsg("Mobile Number lenght should be 10.")
            continueflag = false
            // confirmAlert({
            //     message: "Mobile Number lenght should be 10.",
            //     buttons: [
            //         {
            //             label: 'Ok',
            //             onClick: () => { continueflag = false }
            //         },
            //     ]
            // });


        }
        else if (document.getElementById('edtName') === undefined
            || document.getElementById('edtName').value.trim === "") {

                continueflag = false
                setmsg("Please Enter Customer Name(Self/Family Members.")
            // confirmAlert({
            //     message: "Please Enter Customer Name(Self/Family Members.",
            //     buttons: [
            //         {
            //             label: 'Ok',
            //             onClick: () => { continueflag = false; }
            //         },
            //     ]
            // });

        } else if (document.getElementById('edtMobile') === undefined
            || document.getElementById('edtMobile').value.trim === "" && document.getElementById('edtMobile').value.length != 10) {
                continueflag = false;
                setmsg("Please enter valid mobile number")
            // confirmAlert({
            //     message: "Please enter valid mobile number",
            //     buttons: [
            //         {
            //             label: 'Ok',
            //             onClick: () => { continueflag = false; }
            //         },
            //     ]
            // });

        }

        else if (!isIncomeAndReasonCaptured) {
            if (document.getElementById('edtCustomerIndividualIncome') === undefined
                || document.getElementById('edtCustomerIndividualIncome').value === "") {
                    continueflag = false;
                    setmsg("Please Enter Customer Individual Income.")
                // confirmAlert({
                //     message: "Please Enter Customer Individual Income.",
                //     buttons: [
                //         {
                //             label: 'Ok',
                //             onClick: () => { continueflag = false; }
                //         },
                //     ]
                // });

            }
            else if (document.getElementById('edtCustomerFamilyIncome') === undefined
                || document.getElementById('edtCustomerFamilyIncome').value.trim === "") {
                    continueflag = false;
                    setmsg("Please Enter Customer Family Income.")
                // confirmAlert({
                //     message: "Please Enter Customer Family Income.",
                //     buttons: [
                //         {
                //             label: 'Ok',
                //             onClick: () => { continueflag = false; }
                //         },
                //     ]
                // });

            }
            else if (document.getElementById('edtReasonForMultipleConnections') === undefined
                || document.getElementById('edtReasonForMultipleConnections').value.trim === "") {
                    continueflag = false;
                    setmsg("Please Enter Reason For Multiple Connections.")
                // confirmAlert({
                //     message: "Please Enter Reason For Multiple Connections.",
                //     buttons: [
                //         {
                //             label: 'Ok',
                //             onClick: () => { continueflag = false; }
                //         },
                //     ]
                // });

            }
            else if (document.getElementById('edtCustomerFamilyIncome').value.trim != "" && document.getElementById('edtCustomerIndividualIncome').value.trim != "") {
                if (parseFloat(document.getElementById('edtCustomerFamilyIncome').value) < parseFloat(document.getElementById('edtCustomerIndividualIncome').value)) {
                    continueflag = false;
                    setmsg("Customer family income cannot be less than individual income.")
                    // confirmAlert({
                    //     message: "Customer family income cannot be less than individual income.",
                    //     buttons: [
                    //         {
                    //             label: 'Ok',
                    //             onClick: () => { continueflag = false; }
                    //         },
                    //     ]
                    // });

                }

            }


            else if (document.getElementById('edtMobile') === undefined
                || document.getElementById('edtMobile').value.trim === "" &&
                document.getElementById('edtMobile').value.length != 10) {
                    continueflag = false;
                    setmsg("Please enter valid mobile number")
                // confirmAlert({
                //     message: "Please enter valid mobile number",
                //     buttons: [
                //         {
                //             label: 'Ok',
                //             onClick: () => { continueflag = false; }
                //         },
                //     ]
                // });

            } else {
                //  if (!EnvironmentUtil.isFTTx()) { //for later
                //     if (document.getElementById('edtMobile') != undefined
                //      &&
                //          document.getElementById('edtMobile').value === (globalVariable.getEkYCResponse().getDetailedData().getCust_Otp_Num()) //for later
                //         ) {
                //         if (globalVariable.getEkYCResponse().getDetailedData().getAltNoRelationShipType().equalsIgnoreCase(DigitalConstatnts.RELATIONSHIP_TYPE_SELF)) {
                //             if (!relationShip.equalsIgnoreCase("Self")) {
                //                 Toast.makeText(getActivity(),
                //                         "Please Select Customer Relationship as Self.",
                //                         Toast.LENGTH_SHORT).show();
                //                 return;
                //             }
                //         }
                //         if (globalVariable.getEkYCResponse().getDetailedData().getAltNoRelationShipType().equalsIgnoreCase(DigitalConstatnts.RELATIONSHIP_TYPE_FAMILY)) {
                //             if (relationShip.equalsIgnoreCase("Self")) {
                //                 Toast.makeText(getActivity(),
                //                         "Please Select Customer Relationship as Family Member.",
                //                         Toast.LENGTH_SHORT).show();
                //                 return;
                //             }
                //         }

                //     }
                //  }
            }


            //for test
            // txnUploadData.CAFRequest.CustIncome = document.getElementById('edtCustomerIndividualIncome').value;
            CAFRequest.CustIncome = document.getElementById('edtCustomerIndividualIncome').value;


            // txnUploadData.CAFRequest.CustFamilyIncome = document.getElementById('edtCustomerFamilyIncome').value;
            CAFRequest.CustFamilyIncome = document.getElementById('edtCustomerFamilyIncome').value;

            // txnUploadData.CAFRequest.ReasonMultipleConnection = document.getElementById('edtReasonForMultipleConnections').value;
            CAFRequest.ReasonMultipleConnection = document.getElementById('edtReasonForMultipleConnections').value;


            // this.addConnection(lv_Connection, et_connection, spnTelco,
            //         adapterTelco, edtMobile, edtName, relationShip,
            //         edtMName, edtLName);

            if (continueflag) {
                setconnection_details_dialog(false)
                addConnection();
                setisIncomeAndReasonCaptured(true)
            }

        } else {
            var isNoSame = false;

            for (let i = 0; i < lstTelcoSelected.size(); i++) {
                var obj = lstTelcoSelected[i];
                if (obj.getMobileNumber() === document.getElementById('edtMobile').value.trim) {
                    isNoSame = true;
                    break;
                }
            }
            if (isNoSame) {
                confirmAlert({
                    message: "Entered mobile number is already in list.",
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => { return; }
                        },
                    ]
                });

            }


            if (continueflag) {
                setconnection_details_dialog(false)
                addConnection();
            }


        }
    }

    const addConnection = () => {
        console.log('inside add con')
    }

    const handleLovSpinner = (e) => {
        setselectedLov(e.currentTarget.value)

        if (e.currentTarget.value === "Self") {
            document.getElementById('edtName').value = "";
            document.getElementById('edtMName').value = "";
            document.getElementById('edtLName').value = "";

            document.getElementById('edtName').readOnly = true;
            document.getElementById('edtMName').readOnly = true;
            document.getElementById('edtLName').readOnly = true;

            document.getElementById('edtName').value = config.customerName;

        } else {
            document.getElementById('edtName').value = "";
            document.getElementById('edtMName').value = "";
            document.getElementById('edtLName').value = "";

            document.getElementById('edtName').readOnly = false;
            document.getElementById('edtMName').readOnly = false;
            document.getElementById('edtLName').readOnly = false;


        }
        setRelationshipLov(e.currentTarget.value);
    }

    const setRelationshipLov = (posrelationType) => {
        switch (posrelationType) {
            case "Self":// "Self"
                setrelationShipLOV("0005")
                break;
            case "Spouse":// "Spouse"
                setrelationShipLOV("0006")

                break;
            case "Father":// "Father":
                setrelationShipLOV("0001")

                break;
            case "Mother":// "Mother":
                setrelationShipLOV("0002")

                break;
            case "Brother":// "Brother":
                setrelationShipLOV("0007")

                break;
            case "Sister":// "Sister":
                setrelationShipLOV("0008")

                break;
            case "Son":// "Son":
                setrelationShipLOV("0009")

                break;
            case "Daughter":// "Daughter":
                setrelationShipLOV("0010")

                break;
            case "Husband":// "Husband"
                setrelationShipLOV("0004")

                break;
            default:
        }
    }

    const edtMobileChange = (e) => {
        if (e.target.value.length > 0) {
            if (e.target.value.length == 1 && e.target.value === "0") {
                document.getElementById('edtMobile').value = ""
            }
        }

    }

    const getTelcoProvider = async (e) => {
        // var api = new APIRouter();
        // var encodeReq = GSON.encode(itsReqModal);
        // var EncryptedRequest = Encrypt(encodeReq.state);
        // console.log('EncryptedRequest:', EncryptedRequest)

        // var responseJson = await api.postApiCal(EncryptedRequest, "itsMethodName");
        // if (numcheck(responseJson)) {
        //     this.props.setState({ loading: false });
        //     confirmAlert({

        //         message: "Error code : " + responseJson + " in call",
        //         buttons: [
        //             {
        //                 label: 'OK',
        //                 onClick: () => { return false }
        //             }
        //         ]
        //     });
        // }

        // else {
        //     var DecryptedResponse = decryptData(responseJson);
        //     console.log("DecryptedResponse : ", DecryptedResponse);
        //         if (DecryptedResponse.Error_Code === "00") {
        //             //set the state of LstOperators of parent
        //         }
        //         else {
        //             confirmAlert({
        //                 message: DecryptedResponse.Error_Msg,
        //                 buttons: [
        //                     {
        //                         label: 'OK',
        //                         onClick: () => { return false }
        //                     }
        //                 ]
        //             });
        //         }
        // }

    }


    // const handleScanSIM = async (data) => {

    //     if (data) {
    //         var xml2js = require('xml2js');

    //         var parser = new xml2js.Parser();
    //         var xml_string = '<SIM>' + data + '</SIM>';
    //         parser.parseString(xml_string, function (error, result) {
    //             if (error === null) {
    //                 if (result.SIM.ICCID != undefined) {
    //                     that.validateICCID(result)

    //                 }
    //                 else {
    //                     confirmAlert({
    //                         message: 'Invalid QR code',
    //                         buttons: [
    //                             {
    //                                 label: 'Ok',
    //                             },

    //                         ]

    //                     });
    //                 }
    //             }
    //             else {
    //                 confirmAlert({
    //                     message: 'Error in parsing QR Data.',
    //                     buttons: [
    //                         {
    //                             label: 'Ok',
    //                         },

    //                     ]

    //                 });
    //             }
    //         });
    //     }
    // }


    const validateICCID = async (result) => {
        setloading(true)
        const ICCIDValReq = await triggerAction(() => validateICCIDservice(result.SIM.ICCID.toString()));
        setloading(false)
        if (ICCIDValReq.errorCode === "00" && ICCIDValReq.availabilityStatus == "1") {

            if (result.SIM.MSISDN) {
                setsimCirclecode(result.SIM.CIRCLECODE.toString());
                setsimEAN(result.SIM.EAN.toString());
                setsimICCID(result.SIM.ICCID.toString())
                setsimIMSI(result.SIM.IMSI.toString())
                setsimMSISDN(result.SIM.MSISDN.toString())
                setopenQRWindow(false)

            }
            else {
                setsimCirclecode(result.SIM.CIRCLECODE.toString());
                setsimEAN(result.SIM.EAN.toString());
                setsimICCID(result.SIM.ICCID.toString())
                setsimIMSI(result.SIM.IMSI.toString())
                setopenQRWindow(false)
                callVanityNumber(result)
            }
        }
        else {
            confirmAlert({

                message: ICCIDValReq.errorMsg,
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
        }
    }

    const callVanityNumber = async () => {

        setloading(true)
        const vanityReq = await triggerAction(() => vanityNumberservice());
        setloading(false)

        if (vanityReq.errorCode === "00" && vanityReq.numbers) {
            setsimMSISDN(vanityReq.numbers[0].id)

        }
        else {
            confirmAlert({

                message: vanityReq.errorMsg,
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
        }


    }


    const handleError = (err) => {
        console.error(err)
    }


    const callOtp = async(e) => {

        if (document.getElementById("chkVerified").checked) {
            let BlockMSISD=  await callBlockMSISDN(); 
            let send_Cust=  await send_Cust_Agent('send_Cust_Agent');
        }
        else {
            setmsgCust("Please check the box before proceed")
            // confirmAlert({
            //     title: 'Alert !',
            //     message: "Please check the box before proceed",
            //     buttons: [
            //         {
            //             label: 'Ok',
            //         },
            //     ]
            // })
        }

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


    const validateOTP = (e) => {

        if (validator.allValid()) {

        }

        else {
            var errorMsgList = validator.getErrorMessages();
            errorMsgList = errorMsg(errorMsgList);
            confirmAlert({
                message: errorMsgList[1],
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => document.getElementById(errorMsgList[0]).focus()
                    },

                ]

            });

            e.preventDefault();

        }

    }



    const send_Cust_Agent = (action, e) => {
        // const validateDigitalKycOtpReq = new ValidateDigitalKycOtpReq();
        // validateDigitalKycOtpReq.setGuid(config.objDeviceSave.Msg);
        // validateDigitalKycOtpReq.setStoreid(config.objSupervisorLogin.Circle_Response.org);
        // validateDigitalKycOtpReq.setAgent_id('10051311');

        // validateDigitalKycOtpReq.setCust_mobileno('9561499434');
        //  validateDigitalKycOtpReq.setAgent_mobileno('9967007858');


        // validateDigitalKycOtpReq.setCust_otp(this.props.state.custOtp);
        // validateDigitalKycOtpReq.setAgent_otp(this.props.state.agOtp);
        // validateDigitalKycOtpReq.setAction(action);
        // validateDigitalKycOtpReq.setOrn('NO00000B7A2I');
        // validateDigitalKycOtpReq.setDeviceId(config.objSupervisorLogin.Circle_Response.org + "" +
        //     // RPOSConfigModel.strPosId //for later
        //     "108"
        // );

        // console.log("validateDigitalKycOtpReq : ", validateDigitalKycOtpReq);
        // return validateDigitalKycOtpReq
        sendDigitalKycOTP(action, config.orderType)

    }
    const callBlockMSISDN = async () => {

        setloading(true)
        const blockMSISDNReq = await triggerAction(() => BlockMSISDNservice(document.getElementById('FRCmsisdn').value));
        setloading(false)

        if (blockMSISDNReq.errorCode === "00") {

        }
        else {
            confirmAlert({

                message: blockMSISDNReq.errorMsg,
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
        }


    }

    const sendDigitalKycOTP = async (action, orderType) => {

        setloading(true)
        // const SendValidateOTP_KYC = await triggerAction(() => SendValidateOTP_KYCservice(custOtp, agOtp, action, ORN));
        const SendValidateOTP_KYC = await triggerAction(() => checkMobile(config.custNumber, "AUTH"));
        setloading(false)

        if (SendValidateOTP_KYC.errorCode === "00") {
            config.ORN=SendValidateOTP_KYC.ORN
            //var countdownTimer = setInterval(this.secondPassed(countdownTimer), 1000)
            setdisplayCustDet(!displayCustDet)
            console.log(`fgufhi`, CAFRequest)
            PlanselectionModel.PRODUCT_ID = PRODUCT_ID
            // PlanselectionModel.lstFRC = document.getElementById('lstFRC').value
            // PlanselectionModel.FRCiccid = document.getElementById('FRCiccid').value
            // PlanselectionModel.FRCimsi = document.getElementById('FRCimsi').value
            PlanselectionModel.FRCmsisdn = document.getElementById('FRCmsisdn').value
            // CAFRequest.ICCID = document.getElementById('FRCiccid').value
            // CAFRequest.IMSI = document.getElementById('FRCimsi').value
            CAFRequest.MSISDN = document.getElementById('FRCmsisdn').value
            CAFRequest.PRODUCT_ID = PRODUCT_ID
            // CAFRequest.PLANID = lstFRC[0].frcID
            CAFRequest.PLANID=document.getElementById('lstFRC').value
            console.log('planselectionModel', PlanselectionModel)

            const currentDateTime = getCurrentDateForPOAPOI()
            config.OTPGenTime=currentDateTime
            config.DG_LTP ="LTP;Z00092;156932;"+ geolocation.latitude + "," + geolocation.longitude + ";" +currentDateTime+ ";" + config.agentMobile + ";" + currentDateTime+ ";"
                
            history.push('/CustOTP')
            
        }
        else if (SendValidateOTP_KYC.errorCode === '03' || SendValidateOTP_KYC.errorCode === '3') {
            confirmAlert({
                title: "Alert!",
                //Pending For confirmation of Error Msg
                message: "Session Expired",
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => {
                            // logout(this, this.props, config); 
                        }
                    }
                ]
            });

        }
        else {
            confirmAlert({

                message: SendValidateOTP_KYC.errorMsg,
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false }
                    }
                ]
            });
        }







    }

    const handleSubmit = (event) => {

        if (validator.allValid()) {

        }

        else {

            var errorMsgList = validator.getErrorMessages();

            errorMsgList = errorMsg(errorMsgList);

            confirmAlert({

                message: errorMsgList[1],

                buttons: [

                    {
                        label: 'Ok',
                        onClick: () => document.getElementById(errorMsgList[0]).focus()
                    },

                ]

            });

            //this.forceUpdate();

            event.preventDefault();

        }
    }



    const fetchPlans = async (e) => {
        setplanType(e.target.value)

        
        
        let pType = '';
        if (e.target.value == "Postpaid Plans") {
            CAFRequest.CAF_TYPE = 'postpaid'
            pType = 'postpaid'
        }
        else {
            pType = 'prepaid'
            CAFRequest.CAF_TYPE = 'prepaid'
        }

        setloading(true)
        const GetmobilityPlan = await triggerAction(() => getmobilityPlanservice(pType));
        setloading(false)

        if (GetmobilityPlan.ErrorCode === "00") {
            setlstSegmentPlan(GetmobilityPlan.lstSegmentPlan);
            setlstPlan(GetmobilityPlan.lstSegmentPlan[0].lstPlan)
            setselectPlan(true)


        }
        else if (GetmobilityPlan.ErrorCode === '03' || GetmobilityPlan.ErrorCode === '3') {
            confirmAlert({
                title: "Alert!",
                message: GetmobilityPlan.ErrorMsg,
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => {
                            // logout(this, this.props, config); 
                        }
                    }
                ]
            });

        }
        else {
            confirmAlert({

                message: GetmobilityPlan.errorMsg,
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
        }




    }



    const mnpclick = async (e) => {

        setloading(true)
        const GetMNP = await triggerAction(() => getMNPservice());
        setloading(false)


        if (GetMNP.ErrorCode === "00") {
            setlstMNP(GetMNP.lstMNP);
            setmnpSelect(GetMNP.lstMNP[0].mnpSelect)
            setisOpen(true)


        }
        else if (GetMNP.ErrorCode === '03' || GetMNP.ErrorCode === '3') {
            confirmAlert({
                title: "Alert!",
                message: GetMNP.ErrorMessage,
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => {
                            // logout(this, this.props, config); 
                            history.push('/home')
                        }
                    }
                ]
            });

        }
        else {
            confirmAlert({

                message: GetMNP.ErrorMessage,
                buttons: [
                    {
                        label: 'OK',
                    }
                ]
            });
        }

        // for test
        // txnUploadData.CAFRequest.VANITYFLAG = "N";
        // txnUploadData.CAFRequest.VanityType = "";
        CAFRequest.VANITYFLAG = "N";
        CAFRequest.VanityType = "";

        openMNPDialog();


    }

    // const vanityClick = (e) => {


    //     clearLOAFiles();

    //     txnUploadData.CAFRequest.MSISDN = "";
    //     document.getElementById("FRCmsisdn").value = "";

    //     txnUploadData.CAFRequest.PLANID = "";
    //     txnUploadData.CAFRequest.Upc_code = ""

    //    txnUploadData.CAFRequest.Service_provider_name = "";
    //     global_position = 0;
    //     openVanityDialog();

    // }

    // cocpclick = (e) => {

    //     clearLOAFiles();


    //     txnUploadData.CAFRequest.MSISDN = "";
    //     document.getElementById("msisdn").value = "";

    //     txnUploadData.CAFRequest.VANITYFLAG = "N"
    //     txnUploadData.CAFRequest.VanityType = "";
    //     txnUploadData.CAFRequest.PLANID = "";
    //     txnUploadData.CAFRequest.Upc_code = "";
    //      txnUploadData.CAFRequest.Service_provider_name = "";
    //     openCOCP_Dilog();
    // }

    const openMNPDialog = () => {
        //for later
    }

    // openVanityDialog() {
    //     //for later

    //     this.setState({ categoryName: [] })
    //     this.setState({ categoryValue: [] })

    // }

    // const openCOCP_Dilog = () => {
    //     //for later
    // }

    // const clearEANData = () => {
    //     //for later
    //     // PlanModel vanityEanModel = null;
    //     // model.setVanityEan("");
    //     // model.setVanityPrice("");
    //     // model.setVanityType("");
    //     // for (int i = 0; i < model.getPlanList().size(); i++) {
    //     //     if (model.getPlanList().get(i).getProductType().equalsIgnoreCase("VANITY")) {
    //     //         vanityEanModel = model.getPlanList().get(i);
    //     //         double dEanPrice = Double.parseDouble(vanityEanModel.getFrcPlanPrice());
    //     //         model.setTxnTotal(model.getTxnTotal() - dEanPrice);
    //     //         model.getPlanList().remove(vanityEanModel);
    //     //         break;
    //     //     }

    //     // }
    // }

    // const clearLOAFiles = () => {
    //     //for later
    //     // File f1 = RPOSUtil.createEkyclibDocFile(getActivity(), "LOA.PDF");
    //     // if (f1.exists())
    //     //     f1.delete();
    //     // this.clearLOAJPGFiles();
    // }

    // const clearLOAJPGFiles = () => {
    //     //for later
    //     // File dir = RPOSUtil.createInternalSubDIR(getActivity(), "LOADocs");
    //     // File f1 = new File(dir.getAbsolutePath(), "LOA.jpg");
    //     // if (f1.exists())
    //     //     f1.delete();
    //     // f1 = new File(dir.getAbsolutePath(), "LOA_TEMP.jpg");
    //     // if (f1.exists())
    //     //     f1.delete();
    // }

    const setMNPdata = () => {
        CAFRequest.VANITYFLAG = "N";
        CAFRequest.VanityType = "";
        CAFRequest.Upc_code = document.getElementById('UPCCode').value
        setsimMSISDN(document.getElementById('MNPMsisdn').value)
        CAFRequest.Mnp_type = document.getElementById('Prepaid1').checked ? 'Prepaid' : 'Postpaid'
        const dateInput = new Date(document.getElementById("upcGenDate").value)
        const extractedDay = dateInput.getDate()
        let extractedMonth = dateInput.getMonth() + 1
        if (extractedMonth < 10) {
            extractedMonth = `0${extractedMonth}`
        }
        const extractedYear = dateInput.getFullYear()
        CAFRequest.Generation_date = extractedDay + "-" + extractedMonth + '-' + extractedYear
        setisOpen(false)
    }

const noOfConnectionsforoperator =(e)=>{
    setNoOFConnectionValueOperator(e.target.value)
}


const  operatorNameFor =(e)=>{
    setOperatorName(e.target.value)
}

    return (

        <div>
            <div>
                {/* {modal} */}
                {console.log(`custLocalRefAdd`,config.custLocalRefAdd)}
                <div className="modal" role="dialog" style={selectPlan ? display : hide}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header1" style={{ "background": "#0D95A2" }}>
                                <h5 className="modal-title" style={{ 'font-weight': 'bold', color: "#ffffff" }}>{planType}</h5>

                                <a className="close" style={{ color: "#ffffff" }} onClick={() => setselectPlan(false)}>X</a>


                            </div>
                            <div>
                                <input type="text" style={{ width: "97%", height: "35px", margin: "5px" }} class="input-style mb10"
                                    onChange={(e) => onChange(e)}
                                    id="dummy"
                                    autocomplete="off"
                                />

                            </div>

                            <div>
                                <div style={{ height: "80vh", overflowY: "scroll" }}>

                                    {lstSegmentPlan.map(function (item, key) {
                                        return (
                                            <Accordion allowZeroExpanded>
                                                <div className="accordian-unit-frame mt-0" key={key}>
                                                    <AccordionItem onSelect={"style:color:#0000000"}>

                                                        <div class="accordian-set">
                                                            <AccordionItemHeading>
                                                                <AccordionItemButton>
                                                                    <div id="AccordionOpen" class="accordian-head"
                                                                    //onClick={child.accordianClick.bind(this, that,xitem)}
                                                                    >
                                                                        <div class="align-items-center d-flex">
                                                                            <div class="col-12 px-2 text-plan-amount md-font" style={{ textAlign: "center" }}>
                                                                                {/* <span class="rupee">`</span> */}
                                                                                {item.SEGMENTIDNAME}
                                                                            </div>

                                                                            {/* <div class="col-6 px-2 text-right text-plan-gb"><span class="md-font">1.5 GB</span>/DAY</div> */}
                                                                        </div>
                                                                        <span class="down-arrow"></span>
                                                                    </div>
                                                                </AccordionItemButton>
                                                            </AccordionItemHeading>
                                                            <AccordionItemPanel>

                                                                <div class="row plan_heading title">
                                                                    <div class="col col-1  pr-0 plan_heading_list"></div>
                                                                    <div class="col col-3 plan_heading_list md-font text-plan-amount" >PLAN ID</div>
                                                                    <div class="col col-6 plan_heading_list md-font text-plan-amount">PLAN DESCRIPTION</div>
                                                                    <div class="col col-2 plan_heading_list md-font text-plan-amount">AMOUNT<br /></div>
                                                                    {/* <div class="col col-2 pr-0 plan_heading_list md-font"></div> */}
                                                                </div>

                                                                {lstSegmentPlan[key].lstPlan.map(function (xitem, xkey) {
                                                                    if (
                                                                        (Search !== "") &&
                                                                        (xitem.POS_DESC.toLowerCase().indexOf(Search.toLowerCase()) === -1) &&
                                                                        (xitem.PRODUCT_ID.toLowerCase().indexOf(Search.toLowerCase()) === -1) &&
                                                                        (xitem.SELLINGPRICE.toLowerCase().indexOf(Search.toLowerCase()) === -1) &&
                                                                        (xitem.lstFRC.length)
                                                                    ) {
                                                                        return null
                                                                    }
                                                                    return (
                                                                        
                                                                        <div class="row plan_details" onClick={(e) => showPlanselected(e, xitem.PRODUCT_ID, xitem.POS_DESC, xitem.SELLINGPRICE, xitem.lstFRC)}>
                                                                            <div class="col col-3 plan_detail_list">
                                                                                <div class="list_inline">
                                                                                {xitem.lstFRC.length?
                                                                                    <span class="big_tt">{xitem.lstFRC[0].frcID}</span>
                                                                                    : null}
                                                                                </div>
                                                                            </div>
                                                                            <div class="col col-7 plan_detail_list">
                                                                                <div class="list_inline">
                                                                                {xitem.lstFRC.length?
                                                                                    <span class="big_tt" >{xitem.lstFRC[0].frcDesc}</span>
                                                                                    : null}
                                                                                    {/* <span class="small_tt">{zitem.validity.split(" ")[1].toString()}</span> */}
                                                                                </div>
                                                                            </div>
                                                                            <div class="col col-2 plan_detail_list">
                                                                                <div class="plan-amt">
                                                                                {xitem.lstFRC.length?
                                                                                <>
                                                                                    <span className="rupee"></span>
                                                                                    <span class="big_tt f-16">
                                                                                        {xitem.lstFRC[0].frcPrice}
                                                                                    </span>
                                                                                    </>
                                                                                    :null}
                                                                                </div>
                                                                            </div>

                                                                        </div>
                                                                        
                                                                        



                                                                    )
                                                                })}
                                                            </AccordionItemPanel>
                                                        </div>
                                                    </AccordionItem>
                                                </div>
                                            </Accordion>

                                        )
                                    })}


                                </div>

                            </div>
                        </div>
                    </div>

                </div>

                {/* {mnpModal} */}

                <div class="modal fade show oy"
                    style={isOpen ? display : hide}
                >
                    <div class="modal-backdrop fade show"></div>
                    <div class="modal-dialog" style={{ zIndex: "inherit" }}>
                        <div class="modal-content" style={{ marginTop: "170px", padding: "10px" }}>
                            <div class="title blue_bg f-medium p-3 white-text primary-b1 md-font">MNP Details
                            <span className="close" style={{ color: "#ffffff" }} onClick={() => setisOpen(false)}>X</span>
                            </div>

                            <div class="pt-0 mt-10">
                                <div class="text-center">
                                    <div class="text-left display-linebreak">
                                        <div class="row no-gutters">
                                            <div class="col-12 pt-2 pb-3">
                                                <div class="form-group">
                                                    <input type="text" id="MNPMsisdn" class="jio-form-control" placeholder=" " autocomplete="off" />
                                                    <label for="MNPMsisdn" class="control-label">Mobile Number :</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row no-gutters">
                                            <div class="col-12 pt-2 pb-3">
                                                <div class="form-group">
                                                    <input type="text" id="UPCCode" class="jio-form-control" placeholder=" " autocomplete="off" />
                                                    <label for="UPCCode" class="control-label">UPC Code :</label>
                                                </div>
                                            </div>
                                        </div>


                                        <div class="row no-gutters">
                                            <div class="col-12 pt-2 pb-3">
                                                <div class="form-group">
                                                    <input type="date" id="upcGenDate" class="jio-form-control" placeholder=" " autocomplete="off" />
                                                    <label for="upcGenDate" class="control-label">UPC Generation Date:</label>
                                                </div>
                                            </div>
                                        </div>

                                        <select class="form-control" id="SelQType1"
                                        >
                                            {lstMNP.map(function (item, key) {
                                                return (

                                                    <option  >{item.Name}</option>

                                                )
                                            })}
                                        </select>

                                        <div class="radio-wrap f-18 w-100">
                                            <div class="custom-control custom-radio custom-control-inline col-5">
                                                <input type="radio" id="Prepaid1" name="SimType1" value="Prepaid Plans" class="custom-control-input" defaultChecked />
                                                <label class="custom-control-label" for="Prepaid1">Prepaid</label>
                                            </div>
                                            <div class="custom-control custom-radio custom-control-inline col-5">
                                                <input type="radio" id="Postpaid1" name="SimType1" value="Postpaid Plans" class="custom-control-input" />
                                                <label class="custom-control-label" for="Postpaid1">Postpaid</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="cust-dtl mt-0">

                                    <div class="row" style={{ marginTop: "25px" }}>
                                        <div class="col-6 col-sm-6">
                                            <button type="button" class="jio-btn jio-btn jio-btn-primary bg-transparent primary-c1 w-100 mb-2 mr-1" onClick={() => setisOpen(false)}>Close</button>
                                        </div>
                                        <div class="col-6 col-sm-6">
                                            <button type="button" class="jio-btn jio-btn jio-btn-primary w-100 mb-2 ml-1"
                                                onClick={(e) => setMNPdata(e)}
                                            >
                                                Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* {cocpModal} */}
                <div class="modal fade show oy" style={cocpselected ? display : hide}>
                    <div class="modal-backdrop fade show"></div>
                    <div class="modal-dialog" style={{ zIndex: "inherit" }}>
                        <div class="modal-content" style={{ marginTop: "170px", padding: "10px" }}>
                            <div class="title blue_bg f-medium p-3 white-text primary-b1 md-font">Select Mobile Number
              <span className="close" style={{ color: "#ffffff" }} onClick={() => this.setState({ cocpselected: false })}>X</span>
                            </div>

                            <div class="pt-0 mt-10">
                                <div class="text-center">
                                    <div class="text-left display-linebreak">
                                        <div class="row no-gutters">
                                            <div class="col-12 pt-2 pb-3">
                                                <div class="form-group">
                                                    <input type="text" id="FRCEmail" class="jio-form-control" placeholder="Please type mobile number" autocomplete="off" id="cocpMobile" />
                                                    {/* <label for="FRCEmail" class="control-label">Mobile Number :</label> */}
                                                </div>
                                            </div>
                                        </div>

                                        <div class="row no-gutters">
                                            <div class="col-12 pt-2 pb-3">
                                                <div class="form-group">
                                                    <input type="text" id="FRCEmail" class="jio-form-control" placeholder="Please type tag number" autocomplete="off" />
                                                    {/* <label for="FRCEmail" class="control-label">Tag No :</label> */}
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div class="row m-0 mt-4">
                                            <div class="col-6 p-2">
                                                <button type="submit" class="btn-block jio-btn jio-btn-primary">Save
                                               <span class="pl-2"></span>
                                               </button>
                                            </div>

                                        </div> */}



                                    </div>
                                </div>
                                <div class="cust-dtl mt-0">

                                    <div class="row" style={{ marginTop: "25px" }}>
                                        <div class="col-6 col-sm-6">
                                            <button type="button" class="jio-btn jio-btn jio-btn-primary bg-transparent primary-c1 w-100 mb-2 mr-1" onClick={(e) => setcocpselected(false)}>Close</button>
                                        </div>
                                        <div class="col-6 col-sm-6">
                                            <button type="button" class="jio-btn jio-btn jio-btn-primary w-100 mb-2 ml-1">Save</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="spin" style={{ zIndex: 10 ,top: "50%"}}>
                    <Spinner visible={loading}
                        spinnerColor={"rgba(0, 0, 0, 0.3)"} />
                </div>
                <div class="my_app_container" id="frm" onSubmit={(e) => checkNextPlan(e, document.getElementById('frm'), e)}>
                    {FixedHeader()}
                    <div>
                        <div class="container">
                            <div class="row">
                                <div class="col rechargehome_wrapper" style={{ height: "100vh" }}>
                                    <div class="card shadow-sm mt-3">
                                        <div class="card-body p-3">
                                            <div class="row no-gutters d-flex align-items-center">
                                                <div class="col-1 space-text-left">
                                                    <img src="./img/pos/back-arrow.png" title="back-button" />
                                                </div>
                                                <div class="col-7 space-text-left md-font">
                                                    Mode of Activation
									            </div>
                                                {config.isAadharKYC ?
                                                    <div class="col-4 bold-font text-right">
                                                        <span class="pr-1"><a href="javascript:void(0);"><img src="./img/pos/icon-tick-green.png" title="Edit" width="" height="" /></a></span>
                                                        <span class="f-18">Aadhaar</span>
                                                    </div>
                                                    :
                                                    <div class="col-4 bold-font text-right">
                                                        <span class="f-16">Non Aadhaar</span>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <section class="card-view-sm mt-3">
                                        {/* <div>
                                                <div class="date-title bold-font mt-3  ml-3 mr-3 mb-2 f-16">
                                                    Select Order Type</div>
                                                <select class="input-style" style={{ height: "38px" }} disabled>
                                                    <option>MOBILITY</option>
                                                    <option>{config.orderType}</option>
                                                </select>
                                            </div> */}
                                        <div class="date-title bold-font mt-3  ml-3 mr-3 mb-2 f-16">Select Sim Type</div>
                                        <div class="card shadow-sm">
                                            <div class="card-body p-3">
                                                <div class="row no-gutters">
                                                    <div class="col-12">
                                                        <div class="formFrame selectSIM">
                                                            <div>
                                                                <div class="radio-wrap f-18 w-100">
                                                                    <div class="custom-control custom-radio custom-control-inline col-5">
                                                                        <input type="radio" id="Prepaid" name="SimType" value="Prepaid Plans" class="custom-control-input" onClick={(e) => fetchPlans(e)}  />
                                                                        <label class="custom-control-label" for="Prepaid">Prepaid</label>
                                                                    </div>
                                                                    <div class="custom-control custom-radio custom-control-inline col-5">
                                                                        <input type="radio" id="Postpaid" name="SimType" value="Postpaid Plans" class="custom-control-input" onClick={(e) => fetchPlans(e)} />
                                                                        <label class="custom-control-label" for="Postpaid">Postpaid</label>
                                                                    </div>
                                                                </div>
                                                                <div class="row no-gutters mt-4" style={isPlanselected ? display : hide}>
                                                                    <div class="col-12">
                                                                        <div class="date-title bold-font mr-3 mb-2 f-16">Chosen plan</div>
                                                                    </div>
                                                                    <div class="col-12 border card" style={{ padding: "5px" }}>
                                                                        <div class="d-flex p-2">
                                                                            <div class="w-100 f-12">
                                                                                <div class="">Benefits</div>
                                                                                <div class="md-font">{POS_DESC}</div>
                                                                            </div>
                                                                            <div class="w-100 text-center pr-1 f-12">
                                                                                <div class="">Plan ID</div>
                                                                                <div class="md-font">{PRODUCT_ID}</div>

                                                                                {/* <div class="md-font">Plan ID</div>
																					<div class="md-font">+</div>
																					<div class="">
																						<span class="md-font"><span class="rupee">`</span>10</span>
																						<span class="f-8">(IUC Top Up)</span>
																					</div> */}
                                                                            </div>
                                                                            <div class="w-100"><button type="button" class="jio-btn jio-btn jio-btn-primary bg-transparent primary-c1 w-100 mb-3 mt-3 mr-1 py-1"
                                                                                onClick={(e) => setisPlanselected(false)} >Change</button></div>
                                                                        </div>
                                                                        <div class="w-100 text-center pr-1 f-12">
                                                                            <select class="input-style" style={{ width: "90%", height: "38px", borderRadius: "20px" }} id="lstFRC">
                                                                                {lstFRC.map((element) =>
                                                                                    (<option>{element}</option>))}
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    <div class="card shadow-sm mt-3">
                                        <div class="card-body p-3">
                                            <div class="formFrame">
                                                {/* <div class="row no-gutters">
                                                    <div class="col-12 pt-2 pb-3">
                                                        <div>

                                                            <input type="text" id="FRCiccid" value={simICCID} class="jio-form-control" placeholder=" " autocomplete="off" />
                                                            <span class="scan-icon" style={{ height: "45px", width: "45px", right: "0", bottom: "15px", position: "absolute" }} onClick={(e) => doScan(e)}> <img class="img-fluid" src="./img/pos/scan-blue.png" /></span>
                                                            <label for="FRCiccid" class="control-label" style={{ top: "-0.3rem" }}>ICCID</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row no-gutters">
                                                    <div class="col-12 pt-2 pb-3">
                                                        <div>
                                                            <input type="text" id="FRCimsi" value={simIMSI} class="jio-form-control" placeholder=" " autocomplete="off" />
                                                            <label for="FRCimsi" class="control-label" style={{ top: "-0.3rem" }}>IMSI</label>
                                                        </div>
                                                    </div>
                                                </div> */}

                                                <div class="row no-gutters">
                                                    <div class="col-12 pt-2 pb-3">
                                                        <div>
                                                            <input type="text" id="FRCmsisdn" value={simMSISDN} class="jio-form-control" placeholder=" " autocomplete="off" />
                                                            <label for="FRCmsisdn" class="control-label" style={{ top: "-0.3rem" }}>MSISDN</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row no-gutters">
                                                    <div class="col-12 pt-2 pb-3">
                                                        <div class="form-group">
                                                            <input type="text" id="FRCEmail" class="jio-form-control" placeholder=" " autocomplete="off" />
                                                            <label for="FRCEmail" class="control-label">Email id</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="row no-gutters">
                                                    <div class="col-12">
                                                        <div class="form-group">
                                                            <div class="radio-wrap">
                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                    <input type="radio" id="vanity" name="onboardtype" value="vanity" class="custom-control-input" defaultChecked
                                                                    // onClick={(e) => vanityClick(e)}
                                                                    />
                                                                    <label class="custom-control-label" for="vanity">Vanity</label>
                                                                </div>
                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                    <input type="radio" id="mnp" name="onboardtype" value="mnp" class="custom-control-input"
                                                                        onClick={(e) => mnpclick(e)}
                                                                    />
                                                                    {/* onClick={child.mnpclick () {
.bind(this)} */}
                                                                    {/* onClick={() => this.setState({ isOPen: true })} */}
                                                                    <label class="custom-control-label" for="mnp">MNP</label>
                                                                </div>
                                                                <div class="custom-control custom-radio custom-control-inline">
                                                                    <input type="radio" id="cocp" name="onboardtype" value="cocp" class="custom-control-input"
                                                                    // onClick={(e) => cocpclick(e)}
                                                                    />
                                                                    <label class="custom-control-label" for="cocp">COCP</label>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="">
                                                    <div class="row no-gutters">
                                                        <div class="col-12">
                                                            <div class="date-title bold-font mr-3 mb-2 f-14">Other mobile connections</div>
                                                            <div class="form-group pt-3">
                                                                <div class="radio-wrap">
                                                                    <div class="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" id="Othr-yes" name="Othr-sel" value="yes" class="custom-control-input"
                                                                            onClick={(e) => setdisplayOtrCon(true)} />
                                                                        <label class="custom-control-label" for="Othr-yes">Yes</label>
                                                                    </div>
                                                                    <div class="custom-control custom-radio custom-control-inline">
                                                                        <input type="radio" id="Othr-no" name="Othr-sel" value="no" class="custom-control-input"
                                                                            onClick={(e) => setdisplayOtrCon(false)} />
                                                                        <label class="custom-control-label" for="Othr-no">No</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={displayOtrCon ? display : hide}>
                                                    <div class="row no-gutters">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div class="col-12">
                                                                        <label for="" class="mb-0">Select Service Provider name</label>
                                                                    </div>
                                                                    <div class="col-12">
                                                                        <div class="custom-select-wrap">
                                                                            <select class="custom-select rounded-0 p-1" id="operator" onChange={(e)=>operatorNameFor(e)}>
                                                                               <option>Select</option>
                                                                                <option value="Jio">Jio</option>
                                                                                <option value="Airtel">Airtel</option>
                                                                                <option value="BSNL">BSNL</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>



                                                    <div class="row no-gutters">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <br/>
                                                                    <br/>
                                                                    <button type="submit" class="btn btn-primary btn-login" style={{ width: "30%", position: "absolute", bottom: "60px", marginLeft: "225px" }}
                                                                            onClick={(e) => btnAdd(e)} >ADD</button>

</div>
</div>
</div>

</div>



                                                    <div class="row no-gutters">
                                                        <div class="col-12">
                                                            <div class="form-group">
                                                                <div class="row">
                                                                    <div>
                                                                        <div class="col-12">
                                                                            <label for="" class="mb-0">No. of Connections</label>
                                                                        </div>
                                                                        <div class="col-12">
                                                                            <div class="custom-select-wrap">
                                                                                <select class="custom-select rounded-0 p-1" id="et_connection" onChange={(e)=>noOfConnectionsforoperator(e)}>
                                                                                  <option>Select</option>
                                                                                    <option value="1">1</option>
                                                                                    <option value="2">2</option>
                                                                                    <option value="3">3</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                          {/* <div style={{ marginTop: "20px" }}> */}

                                                                        <button type="submit" class="btn btn-primary btn-login" style={{"margin-left": "150px", width: "100px","margin-top": "-56px"}} onClick={() => setdisplayCustDet(!displayCustDet)}>OK</button>
                                                                    </div>
                                                                    {/* </div> */}
                                                                  
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>






                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="row m-0 mt-4">
                                        <div class="col-12 p-2">
                                            <button type="submit" class="btn jio-btn jio-btn-primary w-100 plan-btn" style={{ "background": "#0D95A2" }} onClick={(e) => checkNextPlan(document.getElementById('frm'), e)}>NEXT<span class="pl-2"></span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <input class="mt-40" id="QRDATA" type="text" style={{ "display": "none" }} onClick={(e) => handleScan(e)} />

                    </div>
                </div>

                {/* added by cc */}
                <div class="modal fade show oy" id="custDetModal" style={displayCustDet ? display : hide}>
                    <div class="modal-backdrop fade show"></div>
                    <div class="modal-dialog" style={{ zIndex: "inherit" }}>
                        <div class="modal-content">
                            <div class="modal-header1" style={{ "background": "#0D95A2" }}>
                                <h6 class="modal-title" style={{ 'font-weight': 'bold', color: "#ffffff" }}><b>Customer Details</b></h6>
                                <a className="close" style={{ color: "#ffffff" }} onClick={() => setdisplayCustDet(false)}>X</a>
                            </div>
                            <div class="input-style" style={{ "height": "80vh", "marginLeft": "10px", "marginTop": "10px", "marginBottom": "10px" }}>
                                <Scrollbars style={{ height: "80vh" }}>
                                    <div class="text-left display-linebreak">
                                        <p style={{ color: "black" }}>
                                            <img style={{ "marginLeft": "30%", width: '40%' }} src={config.custCaptureImage.frontCustImg} alt="cust img"></img>
                                            <br></br>
                                            <label style={{ "fontWeight": "bold", "marginTop": "2px" }}>Customer Name :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custDelAdd.custName}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Customer DOB :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custDelAdd.dob}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Mobile number used <br></br>for customer signature :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custNumber}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Alternate Contact <br></br>Number :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custDelAdd.altMoNo}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Contact Type :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custDelAdd.ALT_Contact_Type}</label>
                                            <br></br>
                                            <hr style={{ "borderColor": "#28a3ae" }}></hr>

                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px", "fontSize": "13px" }}>Permanent Address</label>
                                            <br></br>

                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>C/O,S/O,D/O,W/O :</label>
                                            <label style={{ "marginTop": "2px" }}>{CAFRequest.CareOf}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>House number/Flat Number/<br></br>Building/Appartment :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custPermAdd.houseNo}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Street/Address/Road Name :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custPermAdd.roadName}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Area/Sector/Locality :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custPermAdd.area}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Landmark :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custPermAdd.landMark}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Village/Town/City :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custPermAdd.city}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>District :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custPermAdd.district}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>State/UT :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custPermAdd.state}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Postal code :</label>
                                            <label style={{ "marginTop": "2px" }}>{config.custPermAdd.pincode}</label>
                                            <br></br>
                                            <hr style={{ "borderColor": "#28a3ae" }}></hr>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px", "fontSize": "13px" }}>POI Details:</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>POI Number :</label>
                                            <label style={{ "marginTop": "2px" }}>{GlobalPOIModel.docNumber}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>POI Type :</label>
                                            <label style={{ "marginTop": "2px" }}>{GlobalPOIModel.docdesc}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Issuing Authority :</label>
                                            <label style={{ "marginTop": "2px" }}>{GlobalPOIModel.issuingAuthority}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Place Of Issue :</label>
                                            <label style={{ "marginTop": "2px" }}>{GlobalPOIModel.placeOfIssue}</label>
                                            <hr style={{ "borderColor": "#28a3ae" }}></hr>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px", "fontSize": "13px" }}>POA Details:</label>
                                            <br></br>
                                            <br></br><label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>POA Number :</label>
                                            <label style={{ "marginTop": "2px" }}>{GlobalPOAModel.docNumber}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>POA Type :</label>
                                            <label style={{ "marginTop": "2px" }}>{GlobalPOAModel.DocName}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Issuing Authority :</label>
                                            <label style={{ "marginTop": "2px" }}>{GlobalPOAModel.issuingauth}</label>
                                            <br></br>
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>Place Of Issue :</label>
                                            <label style={{ "marginTop": "2px" }}>{GlobalPOAModel.placeOfIssue}</label>
                                            <br></br>
                                            <hr style={{ "borderColor": "#28a3ae" }}></hr>
                                           { displayOtrCon ? 
                                            <label style={{ "fontWeight": "bolder", "marginTop": "2px", "fontSize": "13px" }}>No. of Mobile Connections in the name of<br></br>customer*:(operator Wise)</label> :''}
                                            <br></br>
                                            { displayOtrCon ? 
                                             <label style={{ "fontWeight": "bolder", "marginTop": "2px" }}>operator-number </label> :''}
                                             { displayOtrCon ? 
                                            <label style={{ "marginTop": "2px" }}>     {operatorName}-{noOFConnectionValueOperator}</label> :''}
                                            <br></br>
                                            <hr style={{ "borderColor": "#28a3ae" }}></hr>
                                            <input type="checkbox" id="chkVerified"></input>
                                            <label style={{ "marginTop": "2px", "fontSize": "13px" }}>Details verified by Customer </label>
                                            <br></br>
                                            {msgCust ? 
                                            <>
                                            <label style={{ color: "#FF0000" }}>{msgCust}</label>
                                                    <br></br>
                                            </>
                                            :
                                            null
                                        }
                                            <button style={{ "color": "#fff", "background": "#0D95A2", "borderRadius": "3rem", "padding": "5px", "margin": "15px", "marginLeft": "90px" }} onClick={(e) => callOtp(e)}>
                                                PROCEED
                                                </button>
                                            <br></br>
                                        </p>
                                    </div>
                                </Scrollbars>

                            </div>
                        </div>
                    </div>
                </div>
                {/* end */}

                {/* added by cc */}
                {/* <div id= 'otpfrm'
                            onSubmit={(e) => child.validateDigitalKycOTP.bind((this.props, document.getElementById('otpfrm'), e))}> */}

                {/* </div> */}
                {/* end */}



                {/* added by cc */}
                <div class="modal fade show oy" id="connection_details_dialog" style={connection_details_dialog ? display : hide}>

                    <div class="modal-backdrop fade show"></div>

                    <div class="modal-dialog" style={{ zIndex: "inherit" }}>

                        <div class="modal-content">

                            <div class="text-center" style={{ "background": "#03007f" }}>

                                <h6 class="modal-title mt-10">
                                    <b style={{ "float": "left", "margin": "5px", color: "white" }}>Connection Details</b>
                                    <img style={{ "float": "right", "margin": "5px", "width": "17px", "height": "17px" }} src="./img/close_btn.png" onClick={() =>
                                        setconnection_details_dialog(!connection_details_dialog)}>
                                    </img>
                                </h6>



                            </div>

                            <div class="input-style" style={{ "height": "500px", "marginLeft": "10px", "marginTop": "10px", "marginBottom": "10px" }}>

                                <Scrollbars style={{ height: 500 }}>

                                    <div class="text-left display-linebreak">

                                        <p style={{ color: "black" }}>

                                            <label style={{ "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "5px" }}>Customer Relationship</label>

                                            <br></br>

                                            <select id="lovSpinner" class="input-style mb10" style={{ height: "38px" }}
                                                onChange={(e) => handleLovSpinner(e)} id="relationType"
                                            >

                                                {lovArray.map((element) => (<option>{element}</option>))}

                                            </select>

                                            <br></br>

                                            <label style={{ "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "5px" }}>Mobile Number</label>
                                            <label style={{ color: "#FF0000" }}>*</label>
                                            <br></br>
                                            <input class="input-style mb10" id="edtMobile" pattern="^[5-9]\d*$" name="edtMobile" type="text" onChange={(e) => edtMobileChange(this, "edtMobile")} onInput={(e) => edtMobileChange(this, "edtMobile")}
                                                autocomplete="off"
                                            />

                                            <br></br>

                                            <label style={{ "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "5px" }}>Customer Name</label>
                                            <label style={{ color: "#FF0000" }}>*</label>
                                            <br></br>
                                            <input class="input-style mb10" id="edtName" name="edtName" type="text" autocomplete="off"
                                            // onChange = {child.setedtName.bind(this)}
                                            />

                                            <br></br>

                                            <label style={{ "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "5px" }}>Customer Middle Name</label>
                                            <label style={{ color: "#FF0000" }}>*</label>
                                            <br></br>
                                            <input class="input-style mb10" id="edtMName" name="edtMName" type="text" maxLength="40" autocomplete="off"
                                            // onChange = {child.setedtMName.bind(this)}
                                            />

                                            <br></br>

                                            <label style={{ "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "5px" }}>Customer Last Name</label>
                                            <label style={{ color: "#FF0000" }}>*</label>
                                            <br></br>
                                            <input class="input-style mb10" id="edtLName" name="edtLName" type="text" maxLength="40" autocomplete="off"
                                            // onChange = {child.setedtLName.bind(this)}
                                            />

                                            <br></br>
                                            {income_reason_layout ?
                                                <div>
                                                    <label style={{ "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "5px" }}>Customer Individual Income</label>
                                                    <label style={{ color: "#FF0000" }}>*</label>
                                                    <br></br>
                                                    <input class="input-style mb10" id="edtCustomerIndividualIncome" name="edtCustomerIndividualIncome" type="text" maxLength="30"
                                                        autocomplete="off"
                                                    // onChange = {child.setedtCustomerIndividualIncome.bind(this)}
                                                    />

                                                    <br></br>

                                                    <label style={{ "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "5px" }}>Customer Family Income</label>
                                                    <label style={{ color: "#FF0000" }}>*</label>
                                                    <br></br>
                                                    <input class="input-style mb10" id="edtCustomerFamilyIncome" name="edtCustomerFamilyIncome" type="text" maxLength="30"
                                                        autocomplete="off"
                                                    // onChange = {child.setedtCustomerFamilyIncome.bind(this)}
                                                    />

                                                    <br></br>

                                                    <label style={{ "fontWeight": "bolder", "marginTop": "10px", "marginLeft": "5px" }}>Reason For Multiple Connections</label>
                                                    <label style={{ color: "#FF0000" }}>*</label>
                                                    <br></br>
                                                    <input class="input-style mb10" id="edtReasonForMultipleConnections" name="edtReasonForMultipleConnections" type="text" maxLength="30"
                                                        autocomplete="off"
                                                    // onChange = {child.setedtReasonForMultipleConnections.bind(this)}
                                                    />
                                                </div>
                                                : null}
                                            <br></br>
                                            {msg ?
                                                <>
                                                    <label style={{ color: "#FF0000" }}>{msg}</label>
                                                    <br></br>
                                                </>
                                                : ''
                                            }

                                            <button type="submit" class="btn btn-primary btn-login" style={{ "marginLeft": "15px" }}

                                                onClick={(e) => btnSave(e)}

                                            >SAVE</button>

                                        </p>

                                    </div>

                                </Scrollbars>

                            </div>

                        </div>

                    </div>

                </div>
                {/* end */}

                {/* added by cc */}


                {/* end */}





            </div>

        </div>


    )


}

export default Planselection