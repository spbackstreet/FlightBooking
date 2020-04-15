const config = {
    Environment: 'DEV',
    DEV: {
        BaseUrl: 'http://10.21.53.125:8080/', //For DKYC
        //BaseUrl:'http://10.144.96.243:8080/', //For Recharge
        //BaseUrl:'http://9.130.9.92:8088/',
        ForgotPass: 'https://sitohs.jio.com:4443'
    },
    appVersion: '11.3.5',
    NewEncryption: false,
    MACID: '',
    IMEI: '',
    trainingMode: false,
    custCircleHeader: '',
    custNumber: '',
    poaCaptureImage: {},
    custCaptureImage: {},
    poiImage: {},
    lstGrpMS : [],
    poaList : [],
    lstAuth_Config : [],  
    deviceId : 'INT9999',
    pincode :'',
    custLocalAdd : {},
    custPermAdd : {},
    custLocalRefAdd :{},
    isOutstation : false,
    customerName :'',
    objSupervisorLogin: {
        lstUrl: [
            {
                Name: "",
                Value: ""
            }
        ],
        // lstAuth_Config: [
        //     {
        //         Key: "",
        //         Value: ""
        //     }
        // ],
        
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
    },
    objDeviceSave: {
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
    },
    // lstGrpMS: [
    //     {
    //         MICROSERVICENAME: "",
    //         ZONEURL: "",
    //         SOAP_ACTION: "",
    //         NAMESPACE: ""
    //     }
    // ],
    userID: '10051311',
    userPass: 'Jan@2020',

    userIDDevfin: 'O!mU$er',
    userPassDevfin: 'P@ssw0rd',

    journeyTypeForMOP: '',
    objGetStore: {},
    objGetTenderListResp: {
        Errorcode: "",
        Errormsg: "",
        TenderListAndroid: [
            {
                Tender_ID: "",
                Tender_Name: "",
                Tender_Mode: "",
                Rounding_Allowed: "",
                TenderImageName: " ",
                Is_Dynamic: "",
                Purchase_Allowed: "",
                TopUp_Allowed: "",
                BalanceCheck_Allowed: "",
                Over_Tender_Allowed: "",
                Food_Coupon: "",
                Is_Signature_Required: "",
                Min_Amt_Allowed: "",
                Max_Amt_Allowed: "",
                TransactionType: "",
                Is_Catalogue_Tender: null
            }
        ]
    },
    lstTenderConfigFieldList: [
        {
            Error_Code: "",
            Error_Msg: "",
            lstConfigField: [
                {
                    TenderId: "",
                    FieldSeqID: "",
                    PromptTxt: "",
                    LabelTxt: "",
                    FieldInputType: "",
                    EntryMode: "",
                    MinLength: "",
                    MaxLength: "",
                    IsMandatory: "",
                    FieldPrimaryID: ""
                }
            ]
        }
    ],
    orderType: '',
    basicAuth: '',
    ORN: '',
    isFTTX: false,
    isAadharKYC: false,
    dateofIssuePOI: '',
    dateofIssuePOA: '',
    LogonTime: '',
    custAltNo: '',
    custNo: '',
    storeID: 'INT9',
    benefit: '',
    quantity: '1',
    amount: '0.00',
    rechargeValidity: '',
    rechargeCode: '',
    walletBalance: '0.00',
    guid: '7341ec33-be23-437a-8138-00739a55bf5a:INT9',
    agentCircleId: '',
    Store_State: "Maharashtra",
    zone: '',
    mobile: '',
    discountAmount: '0',
    planType: 'R',
    userCircelId: '',
    posid: '',
    storeCode: '',
    APIKey: 'l7xx051a664ec28e43ce9775edf4ae88becf',
    jioRoute: '',
    GetRechargePlansRes: {},
    devicelog: '',
    transName: 'BR',
    navigateSuccessPayment: '',
    plan: '',
    topupRechargeDetailsModel: '',
    mobileNo: '',
    uploadXml: '',
    OrderType: '',
    TxnID: '',
    TaxInvoice: '',
    dPlanAmount: '0',
    vtopupRechargeDetailsModel: '',
    strFooterId: "",
    strHeaderId: "",
    strBTPrinterName: "",
    strIsTaxPrinting: "",
    isMagEnable: false,
    applicationType: 'React',
    RefundDetailModel: "",
    //ModelTxnHeader : new ModelTxnHeader();
    propertyCountEmbedded: 0,
    prodAddedMsg: 'Product has been added successfully in cart.'
};

export default config;