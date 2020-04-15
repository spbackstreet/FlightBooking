import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { Scrollbars } from 'react-custom-scrollbars';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { getHttpStatus } from '../../../Common/JS/constants';
import { fips } from 'crypto';
import { Encrypt, decryptData } from '../../../Common/JS/Encryption-Decryption';
import config from '../../../config';

import QrReader from 'react-qr-reader';
import GetmobilityPlanReq from '../Model/GetmobilityPlanReq';
import APIRouter from '../../../../src/Common/JS/ApiRouter';
import { errorMsg } from '../../../Common/JS/errorMsg';
import { basicAuth } from "../../../Common/JS/basicAuth";
import { numcheck } from "../../../Common/JS/commonvalidation";
import SimpleReactValidator from 'simple-react-validator';
import ValidateDigitalKycOtpReq from '../Model/ValidateDigitalKycOtpReq';
import PlanselectionModel from '../Model/PlanselectionModel';
import { getValueFromAuthConfigList } from '../../../Common/JS/constants';
import txnUploadData from '../../../txnUploadData/txnUploadData';
import { logout } from '../../../Common/JS/CommonMethods';
import CAFRequest from '../../../txnUploadData/cafRequest'

var GSON = require('gson');

var global_position = 0;
let that;
class PlanselectionChild extends React.Component {

    constructor(props) {
        super(props);
        that = this;
        this.state = {
            userid: '',
            lstSegmentPlan: [],
            lstPlan: [],
            Search: "",
            displayConsent: false,
            displayCustDet: false,//added by cc
            displayConsentDealer: false,
            simCirclecode: '',
            simEAN: '',
            simICCID: '',
            simIMSI: '',
            simMSISDN: '',
            //added by cc
            displayOTPSuccess: false,
            doneC: false,
            doneA: false,
            time: {},
            timeA: {},
            seconds: 30,
            secondsA: 30,
            isIncomeAndReasonCaptured: false,
            displayCustDet: false,
            displayOtrCon: false,
            noOfConnections: 0,
            otr: false,
            agOtp: '',
            custOtp: '',
            iccid: '',
            categoryName: [],
            categoryValue: [],
            // custAltNo : this.props.props.history.location.state.custAltNo,
            //end
            lstFRC: [],
            isOpen:false,
            MnpOpt:[]
        };

    }
    state = {
        userid: '',
        APIKey: '',
        DeviceDate: '',
        selectPlan: false,
        lstSegmentPlan: [],
        lstPlan: [],
        isPlanselected: false,
        PRODUCT_ID: '',
        POS_DESC: '',
        SELLINGPRICE: '',
        displayConsent: false,
        displayCustDet: false,//added by cc
        displayConsentDealer: false,
        planType: '',
        result: 'No result',
        openQRWindow: false,
        simCirclecode: '',
        simEAN: '',
        simICCID: '',
        simIMSI: '',
        simMSISDN: '',
        isIncomeAndReasonCaptured: false,
        displayCustDet: false,
        displayOtrCon: false,
        displayOTPSuccess: false,
        noOfConnections: 0,
        otr: false,
        agOtp: '',
        custOtp: '',
        iccid: '',
        categoryName: [],
        categoryValue: [],
        // custAltNo : this.props.props.history.location.state.custAltNo,
        //end

        lstFRC: [],
        isOpen:false,
        MnpOpt:[]
    }
    componentWillMount() {
        this.validator = new SimpleReactValidator();
    }

    doScan(e) {
        e.preventDefault();
        if (window.Mobile) {
            console.log("NEELAM1 " + config.userID)

            window.Mobile.handleScanQR();
        }
    }

    handleScan(e) {
        e.preventDefault();
        var data = document.getElementById('QRDATA').value;
        that.handleScanSIM(data)
    }

    callValidator(frm, e) {

        var validator = new SimpleReactValidator();
        validator.message('FirstName', frm.FirstName.value, 'required');
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
                        onClick: () => document.getElementById(errorMsgList[0]).focus()
                    },

                ]

            });
            e.preventDefault();
            return false;
        }

    }

    charcheck(e) {

        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            this.setState({ userid: e.target.value })
        }

    }
    onChange = e => {
        that.props.setState({
            Search: e.target.value
        });
    }
    showPlanselected = (PRODUCT_ID, POS_DESC, SELLINGPRICE, lstFRC) => {
        if (lstFRC.length >= 1) {
            var FRC = []
            for (let x = 0; x < lstFRC.length; x++) {
                FRC.push(lstFRC[x].frcID)
            }
            this.props.setState({
                PRODUCT_ID: PRODUCT_ID,
                POS_DESC: POS_DESC,
                SELLINGPRICE: SELLINGPRICE,
                lstFRC: FRC
            })

            this.props.setState({
                selectPlan: false,
                isPlanselected: true
            })
        }
        else {
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
    constentConfirm = () => {

    }
    lstPlanFRCValidator(frm, e) {

        var validator = new SimpleReactValidator();
        validator.message('Plan', frm.lstFRC.value, 'required');

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
    callValidator(frm, e) {
        var validator = new SimpleReactValidator();
        validator.message('iccid', frm.FRCiccid.value, 'required');
        validator.message('imsi', frm.FRCimsi.value, 'required');
        validator.message('msisdn', frm.FRCmsisdn.value, 'required');

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
    // checkNextPlan = (props,frm,e) => {
    //     e.preventDefault();
    //     if (this.props.state.otr) {
    //         this.rYesOtherConnection(e)

    //     }
    //     else{
    //         this.props.setState({ displayCustDet: !this.state.displayCustDet })
    //     }
    // }
    checkNextPlan = (prop, frm, e) => {
        e.preventDefault();
        var validationCheck = this.lstPlanFRCValidator(frm, e);
        if (validationCheck) {
            var validationCheck1 = this.callValidator(frm, e);
            if (validationCheck1) {
                console.log("this.props : ", this.props);
                if (this.props.state.otr) {
                    this.rYesOtherConnection(prop)
                }
                else {
                    this.props.setState({ displayCustDet: true })
                }
            }
        }
    }


    rYesOtherConnection = (e) => {
        this.props.setState({ isIncomeAndReasonCaptured: false });
        this.props.setState({ noOfConnections: 0 });
        // lstTelcoSelected = new ArrayList<TelcoProvidersSelectedModel>();
        this.props.setState({ TelcoOperatorSelected: "" });
        //model.setOtherMobileConnections("");//not in DeviceSellModal
        //model.setNoOfConectionsForCaf("0");//not in DeviceSellModal
        //model.setNoOfConnDeDup("0");//not in DeviceSellModal

        this.openOtherMobileConnectionsDialog(e);

    }

    openOtherMobileConnectionsDialog = (e) => {
        this.props.setState({ displayOtrCon: true })
        if (this.props.state.agentCircleJKorNE) {
            document.getElementById('et_connection').value = '1'
            document.getElementById('et_connection').setEnabled = false

        } else {
            document.getElementById('et_connection').value = '1'
            document.getElementById('et_connection').setEnabled = true;
        }
    }

    btnAdd = (e) => {
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
        this.props.setState({ noOfConnections: 0 });

        var flagnoOfConnections = this.props.state.noOfConnections;
        for (let i = 0; i < this.props.state.lstTelcoSelected.length; i++) {
            flagnoOfConnections = parseInt(flagnoOfConnections)
                + parseInt(this.props.state.lstTelcoSelected[i]
                    .getNoofConnections());
        }
        //for test
        this.props.state.agentCircleJKorNE = true;
        if (this.props.state.agentCircleJKorNE) {
            if (parseInt(this.props.state.noOfConnections)
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
                this.openNoOfConnectionDialogForJK_NE()
                // this.openNoOfConnectionDialogForJK_NE(lv_Connection,
                //         et_connection, spnTelco, adapterTelco);
            }
        } else {

            if (parseInt(this.props.state.noOfConnections)
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
                this.addConnection()
                // this.addConnection(lv_Connection, et_connection, spnTelco,
                //         adapterTelco, null, null, null, null, null);
            }
        }
    }

    openNoOfConnectionDialogForJK_NE() {
        this.props.setState({ connection_details_dialog: true })
        if (this.props.state.isIncomeAndReasonCaptured)
            this.props.setState({ income_reason_layout: false });
        else
            this.props.setState({ income_reason_layout: true });
    }

    btnSave = (e) => {
        var continueflag = true;
        var msg = "";
        if (document.getElementById('edtMobile').value.length != 10) {
            msg = "Mobile Number lenght should be 10."
            confirmAlert({
                message: "Mobile Number lenght should be 10.",
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => { continueflag = false }
                    },
                ]
            });


        }
        else if (document.getElementById('edtName') === undefined
            || document.getElementById('edtName').value.trim === "") {
            confirmAlert({
                message: "Please Enter Customer Name(Self/Family Members.",
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => { continueflag = false; }
                    },
                ]
            });

        } else if (document.getElementById('edtMobile') === undefined
            || document.getElementById('edtMobile').value.trim === "" && document.getElementById('edtMobile').value.length != 10) {
            confirmAlert({
                message: "Please enter valid mobile number",
                buttons: [
                    {
                        label: 'Ok',
                        onClick: () => { continueflag = false; }
                    },
                ]
            });

        }

        else if (!this.props.state.isIncomeAndReasonCaptured) {
            if (document.getElementById('edtCustomerIndividualIncome') === undefined
                || document.getElementById('edtCustomerIndividualIncome').value === "") {
                confirmAlert({
                    message: "Please Enter Customer Individual Income.",
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => { continueflag = false; }
                        },
                    ]
                });

            }
            else if (document.getElementById('edtCustomerFamilyIncome') === undefined
                || document.getElementById('edtCustomerFamilyIncome').value.trim === "") {
                confirmAlert({
                    message: "Please Enter Customer Family Income.",
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => { continueflag = false; }
                        },
                    ]
                });

            }
            else if (document.getElementById('edtReasonForMultipleConnections') === undefined
                || document.getElementById('edtReasonForMultipleConnections').value.trim === "") {
                confirmAlert({
                    message: "Please Enter Reason For Multiple Connections.",
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => { continueflag = false; }
                        },
                    ]
                });

            }
            else if (document.getElementById('edtCustomerFamilyIncome').value.trim != "" && document.getElementById('edtCustomerIndividualIncome').value.trim != "") {
                if (parseFloat(document.getElementById('edtCustomerFamilyIncome').value) < parseFloat(document.getElementById('edtCustomerIndividualIncome').value)) {
                    confirmAlert({
                        message: "Customer family income cannot be less than individual income.",
                        buttons: [
                            {
                                label: 'Ok',
                                onClick: () => { continueflag = false; }
                            },
                        ]
                    });

                }

            }


            else if (document.getElementById('edtMobile') === undefined
                || document.getElementById('edtMobile').value.trim === "" &&
                document.getElementById('edtMobile').value.length != 10) {
                confirmAlert({
                    message: "Please enter valid mobile number",
                    buttons: [
                        {
                            label: 'Ok',
                            onClick: () => { continueflag = false; }
                        },
                    ]
                });

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


            txnUploadData.CAFRequest.CustIncome = document.getElementById('edtCustomerIndividualIncome').value;

            txnUploadData.CAFRequest.CustFamilyIncome = document.getElementById('edtCustomerFamilyIncome').value;

            txnUploadData.CAFRequest.ReasonMultipleConnection = document.getElementById('edtReasonForMultipleConnections').value;

            // this.addConnection(lv_Connection, et_connection, spnTelco,
            //         adapterTelco, edtMobile, edtName, relationShip,
            //         edtMName, edtLName);

            if (continueflag) {
                this.props.setState({ connection_details_dialog: false });
                this.addConnection();
                this.props.state.isIncomeAndReasonCaptured = true;
            }






        } else {
            var isNoSame = false;

            for (let i = 0; i < this.props.state.lstTelcoSelected.size(); i++) {
                var obj = this.props.state.lstTelcoSelected[i];
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

            //for later
            // if (!EnvironmentUtil.isFTTx()) {
            //     //Changed by @Pushkar for DOT Enhancement
            //     if (edtMobile.getText() != null && edtMobile.getText().toString().equalsIgnoreCase(globalVariable.getEkYCResponse().getDetailedData().getCust_Otp_Num())) {
            //         if (globalVariable.getEkYCResponse().getDetailedData().getAltNoRelationShipType().equalsIgnoreCase(DigitalConstatnts.RELATIONSHIP_TYPE_SELF)) {
            //             if (!relationShip.equalsIgnoreCase("Self")) {
            //                 Toast.makeText(getActivity(),
            //                         "Please select relationship as self only.",
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
            // }


            // addConnection(lv_Connection, et_connection, spnTelco,
            //         adapterTelco, edtMobile, edtName, relationShip,
            //         edtMName, edtLName);
            if (continueflag) {
                this.props.setState({ connection_details_dialog: false });
                this.addConnection();
            }


        }
    }

    addConnection() {
        console.log('inside add con')
    }

    handleLovSpinner = (e) => {
        this.props.setState({ selectedLov: e.currentTarget.value });
        if (e.currentTarget.value === "Self") {
            document.getElementById('edtName').value = "";
            document.getElementById('edtMName').value = "";
            document.getElementById('edtLName').value = "";

            document.getElementById('edtName').readOnly = true;
            document.getElementById('edtMName').readOnly = true;
            document.getElementById('edtLName').readOnly = true;

            document.getElementById('edtName').value = this.props.props.location.state.customerName;

        } else {
            document.getElementById('edtName').value = "";
            document.getElementById('edtMName').value = "";
            document.getElementById('edtLName').value = "";

            document.getElementById('edtName').readOnly = false;
            document.getElementById('edtMName').readOnly = false;
            document.getElementById('edtLName').readOnly = false;


        }
        this.setRelationshipLov(e.currentTarget.value);
    }

    setRelationshipLov(posrelationType) {
        switch (posrelationType) {
            case "Self":// "Self"
                this.props.state.relationShipLOV = "0005";
                break;
            case "Spouse":// "Spouse"
                this.props.state.relationShipLOV = "0006";
                break;
            case "Father":// "Father":
                this.props.state.relationShipLOV = "0001";
                break;
            case "Mother":// "Mother":
                this.props.state.relationShipLOV = "0002";
                break;
            case "Brother":// "Brother":
                this.props.state.relationShipLOV = "0007";
                break;
            case "Sister":// "Sister":
                this.props.state.relationShipLOV = "0008";
                break;
            case "Son":// "Son":
                this.props.state.relationShipLOV = "0009";
                break;
            case "Daughter":// "Daughter":
                this.props.state.relationShipLOV = "0010";
                break;
            case "Husband":// "Husband"
                this.props.state.relationShipLOV = "0004";
                break;
            default:
        }
    }

    edtMobileChange = (e) => {
        if (e.target.value.length > 0) {
            if (e.target.value.length == 1 && e.target.value === "0") {
                document.getElementById('edtMobile').value = ""
            }
        }

    }

    async getTelcoProvider(e) {
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


    async handleScanSIM(data) {
        var that = this
        if (data) {
            var xml2js = require('xml2js');

            var parser = new xml2js.Parser();
            var xml_string = '<SIM>' + data + '</SIM>';
            parser.parseString(xml_string, function (error, result) {
                if (error === null) {
                    if (result.SIM.ICCID != undefined) {
                        that.validateICCID(result)

                    }
                    else {
                        confirmAlert({
                            message: 'Invalid QR code',
                            buttons: [
                                {
                                    label: 'Ok',
                                },

                            ]

                        });
                    }
                }
                else {
                    confirmAlert({
                        message: 'Error in parsing QR Data.',
                        buttons: [
                            {
                                label: 'Ok',
                            },

                        ]

                    });
                }
            });
        }
    }


    async validateICCID(result) {
        var ICCIDValReq =
        //         {
        //             "guId": config.objDeviceSave.Msg,
        //             "storeId": config.objSupervisorLogin.Circle_Response.org,
        //             "userId": "10051311",
        //             "action": "1",
        //             "circleId": "MU",
        //             "identifier": [{
        //                             "name": "ICCID",
        //                             "value": "8991874101888906848"
        //             }],
        //             "starterKitCode": "N",
        //             "imsi": "Y"
        // }
        {
            guId: config.objDeviceSave.Msg,
            storeId: config.objSupervisorLogin.Circle_Response.org,
            userId: '10051311',
            action: "1",
            circleId: "MU",
            orn: "NO25464657",
            identifier: [{
                name: "ICCID",
                "value": result.SIM.ICCID.toString()
            }],
            starterKitCode: "N",
            imsi: "Y"
        }
        var api = new APIRouter();
        if (config.NewEncryption === true) {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'ValidateICCID');
            var resData = await api.postApiCalNewEncryption(ICCIDValReq, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }
        else {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'ValidateICCID');
            var resData = await api.postApiCalStoreID(ICCIDValReq, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);

        }
        if (numcheck(resData)) {
            that.props.setState({ loading: false });
            confirmAlert({

                message: getHttpStatus(resData),
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false }
                    }
                ]
            });
        }
        else {
            that.props.setState({ loading: false });
            if (resData.errorCode === "00" && resData.availabilityStatus == "1") {

                if (result.SIM.MSISDN) {
                    that.props.setState({
                        simCirclecode: result.SIM.CIRCLECODE.toString(),
                        simEAN: result.SIM.EAN.toString(),
                        simICCID: result.SIM.ICCID.toString(),
                        simIMSI: result.SIM.IMSI.toString(),
                        simMSISDN: result.SIM.MSISDN.toString(),
                        openQRWindow: false
                    })
                }
                else {
                    that.props.setState({
                        simCirclecode: result.SIM.CIRCLECODE.toString(),
                        simEAN: result.SIM.EAN.toString(),
                        simICCID: result.SIM.ICCID.toString(),
                        simIMSI: result.SIM.IMSI.toString(),
                        openQRWindow: false
                    })
                    that.callVanityNumber()
                }
            }
            else {
                confirmAlert({

                    message: resData.errorMsg,
                    buttons: [
                        {
                            label: 'OK',
                        }
                    ]
                });
            }
        }
    }
    async callVanityNumber() {
        let request =
        // {
        //     guId: config.objDeviceSave.Msg,
        //     storeId: config.objGetStore.StoreID,
        //     circleId: config.agentCircleId,
        //     orn: "",
        //     identifier: {
        //         name: "MSISDN"
        //     },
        //     searchPattern: "",
        //     vanityName: "",
        //     includeVanityNumber: "false",
        //     paging: {
        //         pageSize: "1",
        //         offset: "1"
        //     }
        // }
        {
            guId: config.objDeviceSave.Msg,
            storeId: config.objSupervisorLogin.Circle_Response.org,
            circleId: 'MU',
            orn: "",
            identifier: {
                name: "MSISDN"
            },
            searchPattern: "",
            vanityName: "",
            includeVanityNumber: "false",
            paging: {
                pageSize: "1",
                offset: "1"
            }
        }

        var api = new APIRouter();
        if (config.NewEncryption === true) {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'GetVanityNumbers');
            var resData = await api.postApiCalNewEncryption(request, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }
        else {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'GetVanityNumbers');
            var resData = await api.postApiCalStoreID(request, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }
        if (numcheck(resData)) {
            that.props.setState({ loading: false });
            confirmAlert({

                message: getHttpStatus(resData),
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false }
                    }
                ]
            });
        }
        else {
            that.props.setState({ loading: false });
            if (resData.errorCode === "00" && resData.numbers) {
                that.props.setState({ simMSISDN: resData.numbers[0].id })
            }
            else {
                confirmAlert({

                    message: resData.errorMsg,
                    buttons: [
                        {
                            label: 'OK',
                        }
                    ]
                });
            }
        }

    }


    handleError = err => {
        console.error(err)
    }

    //     async fetchPlans(e) {
    //         console.log('Sameer')
    //         var that=this
    //         var api = new APIRouter();
    //         this.setState({ planType: e.target.value })
    //         let pType = '';
    //         if (e.target.value == "Postpaid Plans") {
    //             pType = 'postpaid'
    //         }
    //         else {
    //             pType = 'prepaid'
    //         }
    //         var vPoa = [{
    //                     Number: "P371777733",
    //                     Type: "Z00021"
    //                 }]
    //         var vPoi = [{
    //             Number: "P371777733",
    //             Type: "Z00021"
    //         }]

    //         var vAdd = { "address" :

    //          {
    //         buildingName: "plot no 36",
    //         careOf: "",
    //         city: "Mumbai,",
    //         country: "IN",
    //         district: "Suburban Mumbai",
    //         landmark: "Near national Park",
    //         locality: "Abhinav Nagar",
    //         pincode: "400066",
    //         state: "MAHARASHTRA",
    //         streetName: "Road number 4"
    //     }
    // }

    //         vPoa.Number = "P371777733" ;
    //         vPoa.Type = "Z00021";

    //         vPoi.Number = "P371777733";
    //         vPoi.Type = "Z00021"

    //         const getmobilityPlanReq = new GetmobilityPlanReq();
    //         const billingDetails = getmobilityPlanReq.getBillingDetails();

    //         getmobilityPlanReq.setBillingDetails(vAdd)

    //         getmobilityPlanReq.setAadhaarNumber("P371777733");
    //         getmobilityPlanReq.setAgentId(config.get('userID'));
    //         getmobilityPlanReq.setCustomerCircleCode("MU");
    //         getmobilityPlanReq.setDateOfBirth("12-09-2001");
    //         getmobilityPlanReq.setEmailAddress("");
    //         getmobilityPlanReq.setFirstName("Nisha M");
    //         getmobilityPlanReq.setGender("F");
    //         getmobilityPlanReq.setMenuType("onboarding");
    //         getmobilityPlanReq.setMiddleName("Sham M");
    //         getmobilityPlanReq.setMobileNumber("9683838388");
    //         getmobilityPlanReq.setORN("NO00000B7A2I");
    //         // getmobilityPlanReq.setNumber("P371777733");
    //         // getmobilityPlanReq.getPOA().setType("Z00021");
    //         getmobilityPlanReq.setPOA(vPoa);
    //         getmobilityPlanReq.setPOI(vPoi);


    //         // address.setbuildingName("plot no 36");
    //         // address.setcareOf("");
    //         // address.setcity("Mumbai");
    //         // address.setcountry("IN");
    //         // address.setdistrict("Suburban Mumbai");
    //         // address.setlandmark("Near national Park");
    //         // address.setlocality("Abhinav Nagar");
    //         // address.setstate("MAHARASHTRA");
    //         // address.setstreetName("Road number 4");

    //         getmobilityPlanReq.setCaf_category("EKYC");
    //         getmobilityPlanReq.setCaf_type(pType);
    //         getmobilityPlanReq.setCircleId("MU");
    //         getmobilityPlanReq.setGuid(config.get('objDeviceSave.Msg'));
    //         getmobilityPlanReq.setServiceType("MOBILITY");
    //         getmobilityPlanReq.setStoreid(config.get('objGetStore.StoreID'));






    //         // const getmobilityPlanReq = new GetmobilityPlanReq({
    //         //     AadhaarNumber: "P371777733",
    //         // AgentId: "22552217",
    //         // CustomerCircleCode: "MU",
    //         // DateOfBirth: "12-09-2001",
    //         // EmailAddress: "",
    //         // FirstName: "Nisha M",
    //         // Gender: "F",
    //         // MenuType: "onboarding",
    //         // MiddleName: "Sham M",
    //         // MobileNumber: "9683838388",
    //         // ORN: "NO00000B7A2I",
    //         // POA: [
    //         //     {
    //         //         Number: "P371777733",
    //         //         Type: "Z00021"
    //         //     }
    //         // ],
    //         // POI: [
    //         //     {
    //         //         Number: "P371777733",
    //         //         Type: "Z00021"
    //         //     }
    //         // ],
    //         // billingDetails: {
    //         //     address: {
    //         //         buildingName: "plot no 36",
    //         //         careOf: "",
    //         //         city: "Mumbai,",
    //         //         country: "IN",
    //         //         district: "Suburban Mumbai",
    //         //         landmark: "Near national Park",
    //         //         locality: "Abhinav Nagar",
    //         //         pincode: "400066",
    //         //         state: "MAHARASHTRA",
    //         //         streetName: "Road number 4"
    //         //     }
    //         // },
    //         // caf_category: "EKYC",
    //         // caf_type: "",
    //         // circleId: "MU",
    //         // guid: "7e88a26f-c24c-44e5-8975-903345833f46:I565",
    //         // serviceType: "MOBILITY",
    //         // storeid: "9195"
    //         //   });


    //         console.log("getmobilityPlanReq : ", getmobilityPlanReq.state)

    //         // var encodeReq = GSON.encode(getmobilityPlanReq.state);
    //         // console.log("Pojo to req : ", encodeReq);
    //         var EncryptedRequest = Encrypt(getmobilityPlanReq.state);
    //         console.log('EncryptedRequest:', EncryptedRequest)

    //         this.setState({ loading: true })
    //         var responseJson = await api.SameerAPI(EncryptedRequest, "GetmobilityPlan");
    //         if (numcheck(responseJson)) {
    //             this.setState({ loading: false });
    //             confirmAlert({

    //               message: "Error code : "+responseJson + " in call" ,
    //               buttons: [
    //                 {
    //                   label: 'OK',
    //                   onClick: () => {return false}
    //                 }
    //               ]
    //             });
    //           }
    //           //end
    //           else{
    //             var DecryptedResponse = decryptData(responseJson);
    //             that.props.setState({ loading: false });
    //             if (DecryptedResponse.ErrorCode === '00') {
    //                 that.props.setState({
    //                     lstSegmentPlan: DecryptedResponse.lstSegmentPlan,
    //                     lstPlan: DecryptedResponse.lstSegmentPlan[0].lstPlan
    //                 })

    //                 console.log(DecryptedResponse)
    //                 that.props.setState({ selectPlan: true })
    //             }
    //           }





    //     }

    callOtp = (e) => {

        if (document.getElementById("chkVerified").checked) {
            this.callBlockMSISDN()
            this.send_Cust_Agent('send_Cust_Agent');
        }
        else {
            confirmAlert({
                title: 'Alert !',
                message: "Please check the box before proceed",
                buttons: [
                    {
                        label: 'Ok',
                    },
                ]
            })
        }

    }

    secondsToTime(secs) {

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


    validateOTP = (e) => {

        if (this.props.validator.allValid()) {

        }

        else {
            var errorMsgList = this.props.validator.getErrorMessages();
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



    send_Cust_Agent = (action, e) => {
        const validateDigitalKycOtpReq = new ValidateDigitalKycOtpReq();
        validateDigitalKycOtpReq.setGuid(config.objDeviceSave.Msg);
        validateDigitalKycOtpReq.setStoreid(config.objSupervisorLogin.Circle_Response.org);
        validateDigitalKycOtpReq.setAgent_id('10051311');
        //commented for later
        // if(!EnvironmentUtil.isFTTx()){
        //     validateDigitalKycOtpReq.setCust_mobileno(globalVariable.getEkYCResponse().getDetailedData().getCust_Otp_Num());
        // }else{
        validateDigitalKycOtpReq.setCust_mobileno('9561499434');
        // validateDigitalKycOtpReq.setAgent_mobileno(getValueFromAuthConfigList('AgentMobile')); // for later
        // validateDigitalKycOtpReq.setAgent_mobileno('9096284056');
        validateDigitalKycOtpReq.setAgent_mobileno('9967007858');


        validateDigitalKycOtpReq.setCust_otp(this.props.state.custOtp);
        validateDigitalKycOtpReq.setAgent_otp(this.props.state.agOtp);
        validateDigitalKycOtpReq.setAction(action);
        validateDigitalKycOtpReq.setOrn('NO00000B7A2I');
        validateDigitalKycOtpReq.setDeviceId(config.objSupervisorLogin.Circle_Response.org + "" +
            // RPOSConfigModel.strPosId //for later
            "108"
        );
        // commented for later
        // if (MobilityLTEODUFTTxUtils.isDoubleORTriplePlay(model.getServiceTypeObj().getServiceID())) {
        //     validateDigitalKycOtpReq.setCust_TVotp(customer_authorization_otp_tv.getText().toString());
        //     validateDigitalKycOtpReq.setAgent_TVotp(agent_authorization_otp_tv.getText().toString());
        // }

        // }
        console.log("validateDigitalKycOtpReq : ", validateDigitalKycOtpReq);
        // return validateDigitalKycOtpReq
        this.sendDigitalKycOTP(validateDigitalKycOtpReq, config.orderType)

    }
    async callBlockMSISDN() {
        let blockMSISDNReq =
        //     {
        //         guId: config.objDeviceSave.Msg,
        //         storeId: config.objGetStore.StoreID,
        //         userId: config.userID,
        //         orn: "",
        //         circleId: config.agentCircleId,
        //         orderRefNumber: config.ORN,
        //         identifier: [{
        //                         name: "MSISDN",
        //                         value: that.props.state.simMSISDN
        //         }]

        // }
        {
            guId: config.objDeviceSave.Msg,
            storeId: config.objSupervisorLogin.Circle_Response.org,
            userId: '10051311',
            orn: "",
            circleId: 'MU',
            orderRefNumber: 'NO12345678',
            identifier: [{
                name: "MSISDN",
                value: document.getElementById('FRCmsisdn').value
            }]

        }
        var api = new APIRouter();
        if (config.NewEncryption === true) {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'BlockMSISDN');
            var resData = await api.postApiCalNewEncryption(blockMSISDNReq, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }
        else {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'BlockMSISDN');
            var resData = await api.postApiCalStoreID(blockMSISDNReq, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }
        if (numcheck(resData)) {
            that.props.setState({ loading: false });
            confirmAlert({

                message: getHttpStatus(resData),
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false }
                    }
                ]
            });
        }
        else {
            that.props.setState({ loading: false });
            if (resData.errorCode === "00") {

            }
            else {
                confirmAlert({

                    message: resData.errorMsg,
                    buttons: [
                        {
                            label: 'OK',
                        }
                    ]
                });
            }

        }
    }

    async sendDigitalKycOTP(validateDigitalKycOtpReq, orderType) {
        var api = new APIRouter();
        var encodeReq = GSON.encode(validateDigitalKycOtpReq);
        if (config.NewEncryption === true) {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'SendValidateOTP_KYC')
            var responseJson = await api.postApiCalNewEncryption(encodeReq.state, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }
        else {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'SendValidateOTP_KYC')
            var responseJson = await api.postApiCalStoreID(encodeReq.state, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }

        if (numcheck(responseJson)) {
            that.props.setState({ loading: false });
            confirmAlert({

                message: getHttpStatus(responseJson),
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false }
                    }
                ]
            });
        }

        else {
            if (responseJson.Error_Code === "00") {
                //var countdownTimer = setInterval(this.secondPassed(countdownTimer), 1000)
                this.props.setState({ displayCustDet: !this.state.displayCustDet })
                PlanselectionModel.PRODUCT_ID = this.props.state.PRODUCT_ID
                PlanselectionModel.lstFRC = document.getElementById('lstFRC').value
                PlanselectionModel.FRCiccid = document.getElementById('FRCiccid').value
                PlanselectionModel.FRCimsi = document.getElementById('FRCimsi').value
                PlanselectionModel.FRCmsisdn = document.getElementById('FRCmsisdn').value
                CAFRequest.ICCID=document.getElementById('FRCiccid').value
                CAFRequest.IMSI=document.getElementById('FRCimsi').value
                CAFRequest.MSISDN=document.getElementById('FRCmsisdn').value
                CAFRequest.PRODUCT_ID=this.props.state.PRODUCT_ID
                CAFRequest.PLANID=document.getElementById('lstFRC').value
                console.log('planselectionModel', PlanselectionModel)
                this.props.props.history.push({
                    pathname: '/AgentCustOTP'
                })

            }
            else if (responseJson.Error_Code === '03' || responseJson.Error_Code === '3') {
                confirmAlert({
                    title: "Alert!",
                    //Pending For confirmation of Error Msg
                    message: "Session Expired",
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { logout(this, this.props, config); }
                        }
                    ]
                });

            }
            else {
                confirmAlert({

                    message: responseJson.Error_Msg,
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { return false }
                        }
                    ]
                });
            }



        }



    }

    handleSubmit = event => {

        if (this.validator.allValid()) {

        }

        else {

            var errorMsgList = this.validator.getErrorMessages();

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



    async fetchPlans(e) {
        this.setState({ planType: e.target.value })
        let pType = '';
        if (e.target.value == "Postpaid Plans") {
            CAFRequest.CAF_TYPE='postpaid'
            pType = 'postpaid'
        }
        else {
            pType = 'prepaid'
            CAFRequest.CAF_TYPE='prepaid'
        }

        var Request =
        {
            "AadhaarNumber": "P371777733",
            "AgentId": "10051311",
            "CustomerCircleCode": "MU",
            "DateOfBirth": "12-09-2001",
            "EmailAddress": "",
            "FirstName": "Nisha M",
            "Gender": "F",
            "MenuType": "onboarding",
            "MiddleName": "Sham M",
            "MobileNumber": "9683838388",
            "ORN": "NO00000B7A2I",
            "POA": [
                {
                    "Number": "P371777733",
                    "Type": "Z00021"
                }
            ],
            "POI": [
                {
                    "Number": "P371777733",
                    "Type": "Z00021"
                }
            ],
            "billingDetails": {
                "address": {
                    "buildingName": "plot no 36",
                    "careOf": "",
                    "city": "Mumbai,",
                    "country": "IN",
                    "district": "Suburban Mumbai",
                    "landmark": "Near national Park",
                    "locality": "Abhinav Nagar",
                    "pincode": "400066",
                    "state": "MAHARASHTRA",
                    "streetName": "Road number 4"
                }
            },
            "caf_category": "EKYC",
            "caf_type": pType,
            "circleId": "MU",
            "guid": config.objDeviceSave.Msg,
            "serviceType": "MOBILITY",
            "storeid": config.objSupervisorLogin.Circle_Response.org
        }


        var api = new APIRouter();
        if (config.NewEncryption === true) {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'GetmobilityPlan');
            var resData = await api.postApiCalNewEncryption(Request, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }
        else {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'GetmobilityPlan');
            var resData = await api.postApiCalStoreID(Request, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }
        if (numcheck(resData)) {
            that.props.setState({ loading: false });
            confirmAlert({

                message: getHttpStatus(resData),
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false }
                    }
                ]
            });
        }
        else {
            console.log('resData.errorCode', resData.ErrorCode)
            that.props.setState({ loading: false });
            if (resData.ErrorCode === "00") {
                that.props.setState({
                    lstSegmentPlan: resData.lstSegmentPlan,
                    lstPlan: resData.lstSegmentPlan[0].lstPlan,
                    selectPlan: true
                })

            }
            else if (resData.ErrorCode === '03' || resData.ErrorCode === '3') {
                confirmAlert({
                    title: "Alert!",
                    message: resData.ErrorMsg,
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { logout(this, this.props, config); }
                        }
                    ]
                });

            }
            else {
                confirmAlert({

                    message: resData.errorMsg,
                    buttons: [
                        {
                            label: 'OK',
                        }
                    ]
                });
            }

        }


    }



     async mnpclick (e) {

      //  debugger;
        this.setState({ isOpen: true })
        // added

        var Request =
        {
            "circlecode":"MU",
            "guId":config.objDeviceSave.Msg,
            "upccode":"AM555755",
            "storeid": config.objSupervisorLogin.Circle_Response.org
        }


        var api = new APIRouter();
        if (config.NewEncryption === true) {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'MNP');
            var resData = await api.postApiCalNewEncryption(Request, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }
        else {
            that.props.setState({ loading: true });
            var APIURL = config.lstGrpMS.filter(
                (item) => item.MICROSERVICENAME == 'MNP');
            var resData = await api.postApiCalStoreID(Request, APIURL[0].ZONEURL + APIURL[0].MICROSERVICENAME);
        }
        if (numcheck(resData)) {
            that.props.setState({ loading: false });
            confirmAlert({

                message: getHttpStatus(resData),
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return false }
                    }
                ]
            });
        }
        else {
            console.log('resData', resData)
            that.props.setState({ loading: false });
            if (resData.ErrorCode === "00") {
                that.props.setState({
                    MnpOpt:resData.lstMNP,
                    isOpen: true
                })

            }
            else if (resData.ErrorCode === '03' || resData.ErrorCode === '3') {
                confirmAlert({
                    title: "Alert!",
                    message: resData.ErrorMessage,
                    buttons: [
                        {
                            label: 'OK',
                            onClick: () => { logout(this, this.props, config); }
                        }
                    ]
                });

            }
            else {
                confirmAlert({

                    message: resData.ErrorMessage,
                    buttons: [
                        {
                            label: 'OK',
                        }
                    ]
                });
            }

        }

        // this.clearEANData();
        // this.clearLOAFiles();
        // GlobalModelSell.paymentarray.CAFRequest.MSISDN = "";


        // model.setIccidValidate(false);//not there in GlobalModelSell
        // model.setMsisdnBlocked(false);//not there in GlobalModelSell


        // document.getElementById("msisdn").value = "";



        // rMNP.setChecked(true);
        // rCOCP.setChecked(false);
        // rVanity.setChecked(false);
        txnUploadData.CAFRequest.VANITYFLAG = "N";
        txnUploadData.CAFRequest.VanityType = "";
        //for later
        //model.setCocpTagNo("");//not there in GlobalModelSell
        // if (CafPayment.response == null || !CafPayment.response.isMNP() && !frcEanModel.isPosMsgValidate()) {
        //     validatePosMsg = new CafPayment(getActivity()) {
        //         @Override
        //         public void onSuccess() {
        //         }
        //         @Override
        //         public void onFail() {

        //         }

        //         @Override
        //         public void isMNPCoupon(boolean mnpCoupon) {
        //             if (mnpCoupon) {
        //                 CafPayment.isMNPCoupon = true;
        //                 mnpPOSMSG();
        //             } else {
        //                 CafPayment.isMNPCoupon = false;
        //                 openMNPDialog();
        //             }
        //         }
        //     };
        //     validatePosMsg.isMNPPOSMSG();
        // } else {
        //     CafPayment.isMNPCoupon = false;
        this.openMNPDialog();
        // }

    }
    vanityClick = (e) => {
        //for later
        // if (CafPayment.isMNPCoupon) {
        //     voidPosMsg();
        // }

        this.clearLOAFiles();

        txnUploadData.CAFRequest.MSISDN = "";
        // model.setIccidValidate(false);//not there in GlobalModelSell
        // model.setMsisdnBlocked(false);//not there in GlobalModelSell
        document.getElementById("FRCmsisdn").value = "";

        // rVanity.setChecked(true);
        // rCOCP.setChecked(false);
        // rMNP.setChecked(false);

        txnUploadData.CAFRequest.PLANID = "";
        txnUploadData.CAFRequest.Upc_code = ""

        // model.setMNP(false);//not there in GlobalModelSell
        // model.setSerPro("");//not there in GlobalModelSell
        // model.setDate("");//not there in GlobalModelSell
        txnUploadData.CAFRequest.Service_provider_name = "";
        global_position = 0;
        this.openVanityDialog();
        // model.setCocpTagNo("");//not there in GlobalModelSell

    }

    cocpclick = (e) => {
        //for later
        // if (CafPayment.isMNPCoupon) {
        //     voidPosMsg();
        // }
        //Added By @Pushkar for LOA
        this.clearLOAFiles();


        txnUploadData.CAFRequest.MSISDN = "";
        // model.setIccidValidate(false);//not there in GlobalModelSell
        // model.setMsisdnBlocked(false);//not there in GlobalModelSell
        document.getElementById("msisdn").value = "";

        // rVanity.setChecked(false);
        // rMNP.setChecked(false);
        // rCOCP.setChecked(true);

        // model.setIsVanity("N");// Added by Dalan
        txnUploadData.CAFRequest.VANITYFLAG = "N"
        txnUploadData.CAFRequest.VanityType = "";
        // Added by delan : remove MNP details
        txnUploadData.CAFRequest.PLANID = "";
        txnUploadData.CAFRequest.Upc_code = "";
        // model.setMNP(false);//not there in GlobalModelSell
        // model.setSerPro("");//not there in GlobalModelSell
        // model.setDate("");//not there in GlobalModelSell
        txnUploadData.CAFRequest.Service_provider_name = "";
        this.openCOCP_Dilog();
    }

    openMNPDialog() {
        //for later
    }

    openVanityDialog() {
        //for later

        this.setState({ categoryName: [] })
        this.setState({ categoryValue: [] })
        // List<GetMNPVaintyDNDListModel> listVanity = globalVariable
        //         .getAgentAuthenticationResModel().getObjSupervisorLogin()
        //         .getLstVanity();
        // if (listVanity != null && listVanity.size() > 0) {
        //     for (int i = 0; i < listVanity.size(); i++) {
        //         categoryName.add(listVanity.get(i).getName());
        //         categoryValue.add(listVanity.get(i).getValue());
        //     }
        // }
    }

    openCOCP_Dilog() {
        //for later
    }

    clearEANData() {
        //for later
        // PlanModel vanityEanModel = null;
        // model.setVanityEan("");
        // model.setVanityPrice("");
        // model.setVanityType("");
        // for (int i = 0; i < model.getPlanList().size(); i++) {
        //     if (model.getPlanList().get(i).getProductType().equalsIgnoreCase("VANITY")) {
        //         vanityEanModel = model.getPlanList().get(i);
        //         double dEanPrice = Double.parseDouble(vanityEanModel.getFrcPlanPrice());
        //         model.setTxnTotal(model.getTxnTotal() - dEanPrice);
        //         model.getPlanList().remove(vanityEanModel);
        //         break;
        //     }

        // }
    }

    clearLOAFiles() {
        //for later
        // File f1 = RPOSUtil.createEkyclibDocFile(getActivity(), "LOA.PDF");
        // if (f1.exists())
        //     f1.delete();
        // this.clearLOAJPGFiles();
    }

    clearLOAJPGFiles() {
        //for later
        // File dir = RPOSUtil.createInternalSubDIR(getActivity(), "LOADocs");
        // File f1 = new File(dir.getAbsolutePath(), "LOA.jpg");
        // if (f1.exists())
        //     f1.delete();
        // f1 = new File(dir.getAbsolutePath(), "LOA_TEMP.jpg");
        // if (f1.exists())
        //     f1.delete();
    }






}

export default (PlanselectionChild);