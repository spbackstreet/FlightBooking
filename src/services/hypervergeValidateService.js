
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import GlobalPOIModel from '../Model/POIModel';
import GlobalPOAModel from '../Model/POAModel';


const hypervergeValidateService = async () => {
    const Request = {

        Agent_Id: config.custNumber,
        StoreId: config.storeID,
        PosId: config.posid,
        Agent_CircleId: config.custCircleHeader,
        ORN: config.orn,
        GUID: config.guid,
        FACE_LIVE: config.livenessScore,
        FACE_MATCHED: "",
        FACE_MATCHED_Agent: "",
        SDK_TYPE: "Vishwam",
        DG_KYC: "O",
        POIResult: {
            DocTypeCode: GlobalPOIModel.doctypecode,
            type: "",
            DocName: GlobalPOIModel.DocName,
            ProofDetails: "",
            ManualEnterDocNum:  GlobalPOIModel.docNumber
        },
        POAResult: {
            DocTypeCode: GlobalPOAModel.doctypecode,
            type: "",
            DocName: config.selectedDocPOAObject.docName,
            ProofDetails: "",
            ManualEnterDocNum:  GlobalPOAModel.docNumber
        },
        QR_Scan: "",
        FM_AGENT_AGENT: "",
        serviceType: "",
        MenuType: "onboarding"


    };
    console.log("Request : ", JSON.stringify(Request))
    const APIURL = "https://devfin.ril.com:8443/SelfDkycCouponManagement//HyperVergeValidate";

    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}

export default hypervergeValidateService;