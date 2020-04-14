import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css 
import { postApiCall } from '../commom/ApiRouter';
import { setItem } from '../services/storageService';



const getCustAdd = async (customer) => {

    let action_type = '';
    if (customer.action_type === 'Add')
        action_type = "INSERT"
    else if (customer.action_type === 'Update')
        action_type = "UPDATE"
    else if (customer.action_type === 'DELETE')
        action_type = "DELETE"
    else
        action_type = "FETCH"

    const Request = {

        "customer_name": customer.name,
        "flat_no": customer.add1,
        "floor_no": customer.floor,
        "block_no": customer.block_no,
        "build_name": customer.build_name,
        "society_name": customer.society_name,
        "plot_no": customer.plot_no,
        "street": customer.street,
        "sector": customer.sector,
        "area": customer.area,
        "city": customer.city,
        "state": customer.state,
        "pincode": customer.pincode,
        "service_lift_available": customer.service_lift_available,
        "mobile_no": customer.mnumber,
        "address_type": customer.address_type,
        "similiar_type": customer.similiar_type,
        "action_type": action_type,
        "customerAddressId": customer.customerAddressId,
        "email": customer.email

    };

    console.log("Request : ", Request)
    // const EncryptedRequest = Encrypt(Request);
    const APIURL = `${process.env.REACT_APP_API_URL}/ECommerce/GetCustomerAddress`;
    try {
        const response = await postApiCall(Request, APIURL);
        if (response.errorCode) {
            setItem("custAdd", Request)
        }
        return response;
        // const DecryptedResponse = decryptData(response.replace(/"/g, ""));
        // if (numcheck(DecryptedResponse)) {
        //     confirmAlert({
        //         title: "Alert!",
        //         message: getHttpStatus(DecryptedResponse),
        //         buttons: [
        //             {
        //                 label: 'OK',
        //                 onClick: () => { return false }
        //             }
        //         ]
        //     });
        // }
        // else {
        //     return DecryptedResponse;
        // }

    } catch (error) {
        console.error(error);
    }

}

export default getCustAdd;