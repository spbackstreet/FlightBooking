import React, { Component } from "react";

class AgantAuthModal extends React.Component {

    objSupervisorLogin = {
        lstUrl: [
            {
                Name: "",
                Value: ""
            }
        ],
        lstAuth_Config: [
            {
                Key: "",
                Value: ""
            }
        ],
        lstDND: [
            {
                Name: "",
                Value: ""
            }
        ],
        lstVanity: [
            {

                Name: "",
                Value: ""
            }
        ],
        lstMNP: [
            {
                Name: "",
                Value: ""
            }
        ],
        lstMenu: [
            {
                ParentMenuName: "",
                ChildMenuName: "",
                ChildId: "",
                ParentId: ""
            }
        ],
        lstSubscription: [
            {
                ProductCode: "",
                ServiceName: "",
                ServiceType: ""
            }
        ],
        SegmentTypes: [],
        ServiceType: [],
        NoShowRTBPlans: [],
        ServiceTypeObjList: [
            {
                ServiceID: "",
                erviceType: "",
                Flag: ""
            }
        ],
        ServiceTypeFTTxObjList: [
            {
                ServiceID: "",
                ServiceType: "",
                Flag: ""
            }
        ],
        CostCasePrcNotAllowedDeviceSell: [],
        CAFPayment: [],
        TopUpPayment: [],
        BillPayment: [],
        MobilityMOP: [],
        FttxMOP: [],
        JHVMOP: [],
        ODUMOP: [],
        lstMOPFuncionality: [
            {
                lstMOP: [],
                MenuName: ""
            }
        ],
        MOPNotInDeviceSell: [],
        LstSimEAN: [],
        LstProductIds: [],
        lstEncryptedSECOAPIS: [
            {
                SR_NO: "",
                SECO_APIS_NAME: ""
            }
        ],
        ServiceTypeFTTx: [],
        fttxMenu: [
            {
                ParentMenuName: "",
                ChildMenuName: "",
                ChildId: "",
                ParentId: ""
            }
        ],
        lstapkmoduleVersion: [
            {
                Type: "",
                version: [
                ]
            }
        ],
        ErrorCode: "",
        ErrorMsg: "",
        MessageTimeInterval: "",
        LAYOUTFORCEFULDOWNLD: "",
        UPDATEDDATECHANGELAYOUT: '',
        Prv1_Fg: "",
        Prv2_Fg: "",
        Prv3_Fg: "",
        Circle_Response: {
            uid: "",
            mail: "",
            sn: "",
            givenname: "",
            CircleId: "",
            org: "",
            pwdchangedtime: "",
            City: "",
            employeenumber: "",
            cn: "",
            orgname: "",
            departmentnumber: "",
            role: "",
            JioCenterId: "",
            mobile: "",
            middlename: "",
            orclmemberof: ""
        },
        Balance: '',
        AccessToken: '',
        ORN: '',
        Store_State: "",
        AadharNumber: "",
        UIDTOKEN: "",
        Store_City: "",
        Store_PinCode: "",
        Store_Name: "",
        Store_Address: "",
        User_Name: "",
        TrainingCount: "",
        TermCode: "",
        ClientSecretKey: "",
        APIKey: "",
        OrderingAPIKey: "",
        AADHAAR_AUTH_KEY: "",
        AADHAAR_EUTH_KEY: "",
        JIO_AUTH_KEY: "",
        JIO_EUTH_KEY: "",
        EKYC_APP_API_KEY: "",
        EKYC_APP_APP_CODE: "",
        UserRoleFlag: '',
        lstReasonCode_BillPay: [
            {
                Name: "",
                Value: ""
            }
        ],
        DOB: "",
        TermCodeValue: "",
        PageSize: "",
        StoreLength: "",
        ScrollCount: "",
        WifiAllowed: [],
        ODASIMAllowed: "",
        DBEncrytionAllowed: "",
        DocumentUpload: "",
        ApplicationTimeOut: "",
        Dummy2: '',
        Dummy3: '',
        Dummy4: '',
        VanitySegments: '',
        NotificationKey: "",
        irPrepaid: "",
        irPostpaid: "",
        isdPrepaid: "",
        isdPostpaid: "",
        VanitySegmentMappings: '',
        AddItemInCAF: "",
        AddItemInRecharge: "",
        AddItemInTopUp: "",
        AddItemInSubscrptionChg: "",
        AddItemInAddOn: "",
        AddItemInBillPay: "",
        AllowMultipleTopupForMobile: "",
        AllowMultipleRechargeForMobile: "",
        AllowMultipleAddonForMobile: "",
        MinPremiumPlanlimit: '',
        MaxPremiumPlanlimit: '',
        PurchaseQtyGoldPlan: '',
        AddServiceSpecIdCheck: "",
        ListofAppointments: [
            {
                ServiceType: "",
                StartTime: "",
                EndTime: "",
                ServiceID: ""
            }
        ],
        ListofUtilities: [
            {
                Id: "",
                description: ""
            }
        ],
        ListofSettings: [
            {
                Id: "",
                description: ""
            }
        ],
        IsContactPrimary: "",
        IsCOCPAllowed: "",
        IsStockCheckRequired: "",
        NameCheckPrecent: "",
        TokenExpiryTimeInMin: "",
        ZONE: "",
        JioMoneySync: "",
        GeoStoreState: "",
        CallCCI: "",
        OtpEnable: '',
        OtpForAdhaarReg: "",
        OtpForAddUser: "",
        IsDeDupeEnabled: "",
        FirstOldFPhoneEAN: "",
        SecondOldFPhoneEAN: "",
        ThirdOldFPhoneEAN: "",
        NewFPhoneEAN: "",
        IsSharedCheck: '',
        statecode: "",
        invoicethresholdamt: "",
        GSTRegno: "",
        MinBillPayAmt: "",
        MaxBillPayAmt: "",
        GSTEnable: "",
        Additional: "",
        RDTokenGeneratecount: "",
        checkCorruptPDF: "",
        AllowSoapEncryption: "",
        AllowRestEncryption: "",
        Encrypt_Start_Index: "",
        Encrypt_End_Index: "",
        SS: "",
        SE: "",
        SH: "",
        Log_Encryption: "",
        REVERIFY_DEMO_AUTH: "",
        Trainingmodeallowed: "",
        MicroSvcDBDwnld: "",
        pdd: "",
        rdd: "",
        JIO_SIM: "",
        GRN_JIO_PHONE: "",
        JIO_PHONE: "",
        VIDSUPPORT: "",
        JioPhoneExchangeList: [],
        JioPhoneExchangeThreshold: "",
        JioPhoneExchangeEAN: "",
        JioPhoneExchangeRcptDesc: "",
        lstVoucherType: [],
        JIOPreBookAllowFlag: "",
        LstStateCode: [],
        cacheloginsslping: "",
        IsUnionTerritory: '',
        AddItemInPlanChange: "",
        AdhaarPay_InPostpaid: "",
        ReverificationStatusCheck: "",
        Brands_Name: '',
        IsBarcodeenable: '',
        LayByPercent: ''
    };
    objDeviceSave = {
        DeviceLog: "",
        ServiceLog: "",
        DeviceUrl: "",
        ServiceUrl: "",
        DeviceCount: "",
        ServiceCount: "",
        errorcode: "",
        errormsg: "",
        Msg: "",
        NameSpaceService: "",
        NameSpaceDevice: "",
        TimeOut: "",
        JIO_MONY_MID: "",
        JIO_MONY_TID: "",
        JIO_MONY_ACTIVATION_CODE: "",
        SUPER_MID: "",
        SUPER_TID: "",
        SUPER_ACTIVATION_CODE: ""
    }
    lstGrpMS = [
        {
            MICROSERVICENAME: "",
            ZONEURL: "",
            SOAP_ACTION: "",
            NAMESPACE: ""
        }
    ];



    setobjSupervisorLogin(objSupervisorLogin) {
        this.objSupervisorLogin = objSupervisorLogin;
    }

    setobjDeviceSave(objDeviceSave) {
        this.objDeviceSave = objDeviceSave;
    }

    setlstGrpMS(lstGrpMS) {
        this.lstGrpMS = lstGrpMS;
    }

};
var GlobalAgantAuthModal = new AgantAuthModal();
export default GlobalAgantAuthModal;
