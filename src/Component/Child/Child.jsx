import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import * as qs from 'query-string';
import useLoader from '../../hooks/useLoader';
import getBilldeskModalQueryStr from '../../services/getBilldeskModalQueryStr';
import config from '../../config';
import { decryptData } from '../../commom/Encryption-Decryption';

const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};

const Child = () => {

    // const [{ app: { ORN, guid}}, dispatch] = useGlobalState();

    const [success, setSuccess] = useState('')
    const [fail, setFail] = useState('')
    let [bdstr, setBdstr] = useState('')
    const history = useHistory();
    const [triggerAction] = useLoader();


    useEffect(() => {

        const values = qs.parse(window.location.search);
        console.log("values : ", values);


        if (values.str) {
            let jsn = decryptData(values.str.replace(/"/g, ""));
            let jsnmsg = jsn.msg;
            let jsnString = JSON.stringify(jsnmsg);
            setBdstr(jsnString)
        }
        else {
            if (values.success) {
                setSuccess(values.success)

            }
            else if (values.fail) {
                setFail(values.fail)

            }
        }



    }, []);

    const startbd = () => {
        window.bdPayment.initialize({
            "msg": document.getElementById('bMsg').value,
            "options": {
                "enableChildWindowPosting": true,
                "enablePaymentRetry": true,
                "retry_attempt_count": 2,
                "txtPayCategory": "NETBANKING"
            },
            "callbackUrl": "http://devfin.ril.com:8080/HealthService/modelWindowCAllBackURL"
        });
    }


    // const reloadBD = (bdstr) => {
    //     console.log("bdstr : ", bdstr);
    //     window.bdPayment.initialize({
    //         "msg": bdstr.msg,
    //         "options": {
    //             "enableChildWindowPosting": true,
    //             "enablePaymentRetry": true,
    //             "retry_attempt_count": 2,
    //             "txtPayCategory": "NETBANKING"
    //         },
    //         "callbackUrl": 'http://devfin.ril.com:8080/HealthService/modelWindowCAllBackURL'
    //     });
    //     if (!localStorage.getItem("n")) {
    //         localStorage.setItem("n", "1")
    //         window.bdPayment.initialize({
    //             "msg": bdstr.msg,
    //             "options": {
    //                 "enableChildWindowPosting": true,
    //                 "enablePaymentRetry": true,
    //                 "retry_attempt_count": 2,
    //                 "txtPayCategory": "NETBANKING"
    //             },
    //             "callbackUrl": 'http://devfin.ril.com:8080/HealthService/modelWindowCAllBackURL'
    //         });
    //         window.location.reload()
    //     }
    //     if (localStorage.getItem("n") && localStorage.getItem("n") == "1") {
    //         localStorage.setItem("n", "2")
    //         window.bdPayment.initialize({
    //             "msg": bdstr.msg,
    //             "options": {
    //                 "enableChildWindowPosting": true,
    //                 "enablePaymentRetry": true,
    //                 "retry_attempt_count": 2,
    //                 "txtPayCategory": "NETBANKING"
    //             },
    //             "callbackUrl": 'http://devfin.ril.com:8080/HealthService/modelWindowCAllBackURL'
    //         });
    //         window.location.reload()
    //     }

    // }


    const callbacktoparent = () => {
        if (window.opener != null && !window.opener.closed) {
            var txtName = window.opener.document.getElementById("txtName");
            var oldval = window.opener.document.getElementById("txtName").value
            txtName.value = oldval + " success";
            window.opener.document.getElementById('btn').disabled = false
        }

        window.close();
    }

    // const testbilldsk = async () => {

    //     // let paramJson = JSON.parse(param)

    //     window.bdPayment.initialize({
    //         "msg": bdstr,
    //         "options": {
    //             "enableChildWindowPosting": true,
    //             "enablePaymentRetry": true,
    //             "retry_attempt_count": 2,
    //             "txtPayCategory": "NETBANKING"
    //         },
    //         "callbackUrl": 'http://devfin.ril.com:8080/HealthService/modelWindowCAllBackURL'
    //     });

    //     // window.bdPayment.initialize ({
    //     //     "msg": 'RRLUAT|NO00000B8AE8|NA|1098|NA|NA|NA|INR|NA|R|rrluat|NA|NA|F|NA|NA|NA|NA|NA|NA|NA|NA|5C747B9372C8B123A14C5120EDDEB680754E95E708B7B31A854787485A71A804',
    //     //     "options": {
    //     //      "enableChildWindowPosting": true,
    //     //      "enablePaymentRetry": true,
    //     //      "retry_attempt_count": 2,
    //     //      "txtPayCategory": "NETBANKING"
    //     //      },
    //     //      "callbackUrl": 'http://devfin.ril.com:8080/HealthService/modelWindowCAllBackURL'
    //     //     });


    //     // window.bdPayment.initialize ({
    //     //     "msg": "RRLUAT|NO00000B8EZC|NA|1098|NA|NA|NA|INR|NA|R|rrluat|NA|NA|F|NA|NA|NA|NA|NA|NA|NA|NA|E2273B6DEE1A3F24A0F04B6AB9A38BB946D0A0C2738E440BE5B2AE9461E6F153",
    //     //     "options": {
    //     //      "enableChildWindowPosting": true,
    //     //      "enablePaymentRetry": true,
    //     //      "retry_attempt_count": 2,
    //     //      "txtPayCategory": "NETBANKING"
    //     //      },
    //     //      "callbackUrl": 'http://devfin.ril.com:8080/HealthService/modelWindowCAllBackURL'
    //     //     });



    // }

    const close = () => {
        // window.open("", "_self");
        // window.onload = function () { window.print(); }
        // window.onafterprint = function () { window.close(); }
        window.open('', '_self').close();
    }


    return (
        <div>

            <input type="button" value="return" onClick={(e) => callbacktoparent()} style={{ "visibility": "hidden" }} />

            <input type="button" id ="startbd" value="startbd" onClick={(e) => startbd()} style={{ "visibility": "hidden" }} />

            {/* <input id="btnbd" type="button" value="test" onClick={(e) => testbilldsk()} style={{ "visibility": "hidden" }} /> */}

            <input type="button" value="close" onClick={(e) => close()} style={{ "visibility": "hidden" }} />

            <input type="text" id="txtSuccess" value={success} style={{ "visibility": "hidden" }} />

            <input type="text" id="txtFail" value={fail} style={{ "visibility": "hidden" }} />

            <input type="text" id="bMsg" style={{ "visibility": "hidden" }} />
            {/* <input type="text" id="amount" style={{ "visibility": "hidden" }}/>
            <input type="text" id="guid" style={{ "visibility": "hidden" }}/>
            <input type="text" id="mobile" style={{ "visibility": "hidden" }}/> */}


            {/* <form id="jspbilldesk" action="https://uat.billdesk.com/pgidsk/PGIMerchantPayment" method="post" style={{ "display": "none" }}>
                {/* <input id = "msg" name="msg" value="RRLUAT|NO00000B8EX8|NA|1098|NA|NA|NA|INR|NA|R|rrluat|NA|NA|F|NA|NA|NA|NA|NA|NA|NA|http://devfin.ril.com:8080/HealthService/modelWindowCAllBackURL|037C0D9C33085CFBE08A0352A08DEF6E12F816C995FCCEAE2EC4BE287AE0FED5" /> */}
            {/* <input id="msg" name="msg" /> */}

            {/* </form>  */}

        </div>
    )

}


export default Child;