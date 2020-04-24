// import GlobalAgantAuthModal from '../../Login/Model/AgentAuthModal';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
// import config from '../../config';
import StaticVarsAndClasses from './StaticVarsAndClasses';
import ModelTxnHeader from './Modal/ModelTxnHeader';


//added by cc
// export function getValueFromAuthConfigList(key) {
//     var value = '';
//     if (GlobalAgantAuthModal.objSupervisorLogin.lstAuth_Config != null) {
//         for (let w = 0; w < GlobalAgantAuthModal.objSupervisorLogin.lstAuth_Config.length; w++) {
//             const element = GlobalAgantAuthModal.objSupervisorLogin.lstAuth_Config[w];
//             if ((element.Key).toUpperCase() === key.toUpperCase()) {

//                 //if (element.Value !== '') {
//                     value = element.Value;
//                     return value;
//                 //}
//             }
//         }

//     }
// else return value;
// };

export function logout(e, varprops, config) {
    config = '';
    varprops.props.history.push({
        pathname: '/',
        state: {

        }
    })
};

export function bindHome(that) {
    that.props.history.push({
        pathname: '/Home',
        state: {

        }
    })

}

//added by cc
export function errorPageRedirect(errorMsg) {
    document.getElementById("error").value = errorMsg;
    this.props.props.history.push({
        pathname: '/errorPage',
        state: {
            errorMsg: errorMsg
        }
    });
}

//added by cc
export function isReturnProductAdded(HSNCode, productID, itemMap) {
    var count = 0;
    if (!ModelTxnHeader.isReplacement)
        return 0;
    if (itemMap.get("strItemType").toString().trim().equalsIgnoreCase("TYPE_HOME_DELIVERY"))
        return 0;
    if (StaticVarsAndClasses.lstItemDetails.size() > 0) {
        for (let i = 0; i < StaticVarsAndClasses.lstItemDetails.size(); i++) {
            if (StaticVarsAndClasses.lstItemDetails.get(i)
                .get("isPromoData") != null &&
                StaticVarsAndClasses.lstItemDetails.get(i)
                    .get("isPromoData").equalsIgnoreCase("false")) {
                count++;
            }
        }
    }
    if (count === 1) {
        //If original product deleted from cart.
        for (let i = 0; i < StaticVarsAndClasses.lstItemDetails.size(); i++) {
            if (StaticVarsAndClasses.lstItemDetails.get(i)
                .get("isPromoData") != null &&
                StaticVarsAndClasses.lstItemDetails.get(i)
                    .get("isPromoData").equalsIgnoreCase("false")) {
                if (!StaticVarsAndClasses.lstItemDetails.get(i)
                    .get("strPrice").contains("-")) {
                    if (!this.isReturnSameAsExchng(HSNCode, productID, itemMap)) {
                        if (!isHSNWithDiffProductID(HSNCode, itemMap))
                            //for both product Return and Exchange not have same HSNCode & ProductID || HSNCod
                            return 3;
                        else
                            //For adding product with same HSNCode but Diff productID
                            return 0;
                    }
                    //For adding product with same HSNCode and productID
                    else {
                        return 0;
                    }
                }
                // return 0;
            }
        }
        var returnFlag = 0;
        if (!this.isReturnSameAsExchng(HSNCode, productID, itemMap)) {
            if (!this.isHSNWithDiffProductID(HSNCode, itemMap))
                //for both product Return and Exchange not have same HSNCode & ProductID || HSNCod
                return 3;
            else
                //For adding product with same HSNCode but Diff productID
                return 1;
        }
        //For adding product with same HSNCode and productID
        else {
            return 1;
        }
    } else if (count === 2)
        //Added both product (Return and Exchange). do not allow to add more product into cart
        return 2;
    else
        return 0;
}

//added by cc
export function isReturnSameAsExchng(HSNCode, productID, itemMap) {
    if (StaticVarsAndClasses.lstItemDetails.size() > 0) {
        for (let i = 0; i < StaticVarsAndClasses.lstItemDetails.size(); i++) {
            if (StaticVarsAndClasses.lstItemDetails[i]
                .isPromoData !== undefined &&
                StaticVarsAndClasses.lstItemDetails[i]
                    .isPromoData === ("false")) {
                if (HSNCode === (StaticVarsAndClasses.lstItemDetails[i]
                    .HSN_CODE) && productID === (StaticVarsAndClasses.lstItemDetails[i]
                        .strProdID)) {
                    itemMap.put("strPrice", StaticVarsAndClasses.lstItemDetails[i]
                        .strPrice);
                    itemMap.put("strisTradeinItem", "1");
                    return true;
                }
                break;
            }
        }
    }
    return false;
}

//added by cc
export function isHSNWithDiffProductID(HSNCode, itemMap) {
    if (StaticVarsAndClasses.lstItemDetails.length > 0) {
        for (let i = 0; i < StaticVarsAndClasses.lstItemDetails.length; i++) {
            if (StaticVarsAndClasses.lstItemDetails[i]
                .isPromoData !== undefined &&
                StaticVarsAndClasses.lstItemDetails[i]
                    .isPromoData === ("false")) {
                if (HSNCode === (StaticVarsAndClasses.lstItemDetails[i]
                    .HSN_CODE)) {
                    //                        String price="-"+itemMap.get("strPrice");
                    //                        itemMap.put("strPrice", price);
                    //itemMap.put("strisTradeinItem", "1");
                    return true;
                }
                break;
            }
        }
    }
    return false;
}

//added by cc
export function isSameDate(current, orgTxnDate) {
    try {
        if (orgTxnDate.length() > 10)
            orgTxnDate = orgTxnDate.substring(0, 11).replace("-", "/");
        // SimpleDateFormat sdf = new SimpleDateFormat("dd/MMM/yyyy");
        if (current === orgTxnDate) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        // TODO Auto-generated catch block
    }
    return false;
}

//added by cc
export function getCountForProductEAN(productId) {
    var count = 0;
    var lst = [];
    for (let i = 0; i < StaticVarsAndClasses.lstItemDetails.length; i++) {
        if (("isPromoData") in StaticVarsAndClasses.lstItemDetails[i] === ("false")) {
            if (("strProdID") in StaticVarsAndClasses.lstItemDetails[i] === productId) {
                count++;
            }
        }
    }
    return count;
}

//added by cc
export function checkForOldFeaturePhone(strProductID) {
    try {
        for (let i = 0; i < StaticVarsAndClasses.lstItemDetails.length; i++) {
            if (("strProdID") in StaticVarsAndClasses.lstItemDetails[i] != null && ("strProdID") in StaticVarsAndClasses.lstItemDetails[i] === strProductID) {
                try {
                    var strPrice = ("strPrice") in StaticVarsAndClasses.lstItemDetails[i];
                    var strItemDesc = ("strItemDesc") in StaticVarsAndClasses.lstItemDetails[i];

                    var price = parseFloat(strPrice);
                    if (price < 0) {
                        return true;
                    } else {
                        return false;
                    }

                } catch (e) {
                    return false;
                }
            }
        }
    } catch (e) {
    }

    return false;
}


export function getHypervergeErrorMessage(errorCode, errorMessage) {
    var errorMessage = errorMessage;
    if (errorCode == 12) {
        errorMessage = "Error Code 12: Message: Failed to connect to server.";
    } else if (errorCode == 14) {
        errorMessage = "Error Code 14: Message: Failed to connect to server.";
    } else if (errorCode == 422) {
        errorMessage = "Invalid document. Please check and try again.";
    }
    return errorMessage;
}
export function showErrorAlert(msg) {

    confirmAlert({

        message: msg,

        buttons: [

            {

                label: 'Ok',

            },

        ]

    })
    return '';
};

export function getCurrentDateTime() {
    // var date = new Date().getDate();
    // var month = new Date().getMonth() + 1;
    // var year = new Date().getFullYear();
    // var hours = new Date().getHours(); //Current Hours
    // var min = new Date().getMinutes(); //Current Minutes
    // var sec = new Date().getSeconds(); //Current Seconds
    // var Finaldate="";
    // if(month.length==1){
    //      Finaldate = (date + ":" + '0' + month + ":" + year + " " + hours + ":" + min + ":" + sec);

    // }else{
    //      Finaldate = (date + ":"  + month + ":" + year + " " + hours + ":" + min + ":" + sec);

    // }

    return moment(new Date()).format("DD:MM:YYYY HH:mm:ss");
}
export function getCurrentDateForTxn  ()  {
    return moment(new Date()).format("DD/MM/YYYY HH:mm:ss");
}

export function getCurrentDateForReceipt  ()  {
    return moment(new Date()).format("DDMMYYYY");
}

export function getCurrentDateForPOAPOI  ()  {
    return moment(new Date()).format("YYYY-MM-DDTHH:mm:ss");
}
export function docDateofIssue  (date)  {
    return moment(new Date(date)).format("DD-MM-YYYY");
}
export function getFourDigitsTxnId(txnId){
    var strTxnId = txnId;
    var zeroesneeded = 4 - strTxnId.length;
    while (zeroesneeded > 0) {
        strTxnId = "0" + strTxnId;
        zeroesneeded--;
    }
    return strTxnId;
}
export function compareTwoDateTime(strDate1, strDate2) {

    try {


        // var date1 =moment(strDate1).format("dd:MM:yyyy'T'HH:mm:ss")
        // var date2 =moment(strDate2).format("dd:MM:yyyy'T'HH:mm:ss")



        // if (date1.compareTo(date2) < 0) {
        //     //System.out.println("date2 is Greater than my date1");
        //     return true;
        // } else {
        //     return false;
        // }
        return false;
    } catch (e) {
        return false;
    }


}

export function hmacshaChecksum(text){

    let sha256 = require('js-sha256');

    let key="WNvVhcelCw1J";

    let hash = sha256.hmac.create(key);

    hash.update(text);

   console.log(hash.hex().toUpperCase())
   
return hash.hex().toUpperCase();

}



