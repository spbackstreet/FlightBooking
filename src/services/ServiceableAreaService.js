

import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import config from '../config';
import { basicAuth } from '../commom/basicAuth';
import { apiCall } from '../commom/commonApiCalling';


const ServiceableAreaService = async (pin, msdn) => {

    // const Request = {

    //     "guid": config.guid,
    //     "callName": "getserviceableareasbypin",
    //     "leadSource": "2",
    //     "leadType": "22",
    //     "pin": pin,
    //     "businessLine": "1",
    //     "dateTime": "1477479050396"
    // };

    const Request = {

        "guid": config.guid,
        "Customer_RMN": msdn,
        "Cust_pincode": pin,
        "orn" : config.ORN

    }
    console.log("Request : ", Request)
    // const APIURL = `${process.env.REACT_APP_API_URL}/MobilityPlan/GetServiceableAreaBypin`;
    const  service =apiCall("GetServiceableAreaBypin")
    const  name=service.MICROSERVICENAME
    const  url=service.ZONEURL
    const APIURL = `${url}${name}`;
    try {
        const response = await postApiCall(Request, APIURL);
        return response;

    } catch (error) {
        console.error(error);
    }

}



export default ServiceableAreaService;