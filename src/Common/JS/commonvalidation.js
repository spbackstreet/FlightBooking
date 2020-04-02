import { func } from "prop-types";

//Added by cc
export function numcheck(e) {

    const re = /^[0-9\b]+$/;
    if (e !== '' && re.test(e)) {
        return true;
    }
    else if (e !== '') {
        return false;
    }
}

export function disableform(formId) {
    
    let f = document.forms[formId].getElementsByTagName('input');
    for (var i=0;i<f.length;i++){
        f[i].disabled=true;

        
    }

    let f1 = document.forms[formId].getElementsByTagName('img');
    for (var i=0;i<f1.length;i++){
        f1[i].disabled=true
        
    }
    let f2 = document.forms[0].getElementsByTagName('textarea');
    for (var i=0;i<f2.length;i++){
        f2[i].disabled=true
    }

    let f3=document.forms[formId].getElementsByTagName('button');
    for (var i=0;i<f3.length;i++){
        f3[i].disabled=true
    }
 }


 export function enableform(formId) {
    let f = document.forms[formId].getElementsByTagName('input');
    for (var i=0;i<f.length;i++){
        f[i].disabled=false
    }
    let f1 = document.forms[0].getElementsByTagName('textarea');
    for (var i=0;i<f1.length;i++){
        f1[i].disabled=false
    }
    let f2 = document.forms[formId].getElementsByTagName('img');
    for (var i=0;i<f2.length;i++){
        f2[i].disabled=false
        
    }
    let f3=document.forms[formId].getElementsByTagName('button');
    for (var i=0;i<f3.length;i++){
        f3[i].disabled=false;
    }
 }

 //end

export function validateRelationShip(frm) {
    try {
        if (frm !== null) {
            if (frm.charAt(0) === ' ') {
                return true;
            }

            const reg = /^[^\\.|,|,|;|:|\\$|\\+|=|&|!|~|`|'|\\{|\\}|\\[|\\]|\\(|\\)|<|>|\?|\/|\*|\\^|%|#|@|\\\\].+[a-zA-Z\\.\\s][^\\.|,|,|;|:|\\$|\\+|=|&|!|~|`|'|\\{|\\}|\\[|\\]|\\(|\\)|<|>|\?|\/|\*|\\^|%|#|@|\\\\]$/;
            if (reg.test(frm)) {
                var inputArrayString = frm.split("\\.");
                if (inputArrayString.length > 1 && inputArrayString.length <= 4) {
                    for (var i = 0; i < inputArrayString.length - 1; i++) {

                        if (inputArrayString[i + 1] != null && inputArrayString[i + 1].length > 3 && inputArrayString[i + 1].substring(0, 1) === " "
                            && inputArrayString[i + 1].substring(1, 2).match("[a-zA-Z]")) {
                        }
                        else {
                            return true;
                        }
                    }
                    return false;
                }
                else if (inputArrayString.length > 3) {
                    return true;
                } else if (inputArrayString.length === 1) {
                    return false;
                }
            }
            else {
                return true;
            }
            return false;
        }
        else {
            return true;
        }
    }
    catch (e) {
        return true;
    }
}

export function isNullEmpty(e) {

    if (e === null || e === '') {
        return true;
    }
    return false;
}

export function isReferenceNumberNotValid(e) {
    var firstFour = e.substring(0, 4);
    var lastSix = e.substring(4, 10);

    const reg = /^([0-4])\\1+$/;
    const lastreg = /^([0-9])\\1+$/;

    if (reg.test(firstFour)) {
        return true;
    }
    else if (lastreg.test(lastSix)) {
        return true;
    }
    else {
        return false;
    }

}

//added by cc
export function edtMobileChange(id,e) {
    const re = /^[0-9\b]+$/;
    const value1 = (e.target.validity.valid) ? e.target.value : e.target.value.substring(0, e.target.value.length - 1);
    document.getElementById(id).value = value1;

    if(e.target.value.length > 0 ){
        if(e.target.value.length == 1 && e.target.value === "0"){
            document.getElementById(id).value = ""
        }
        else if(e.target.value.length === 11){
            document.getElementById(id).value = document.getElementById(id).value.substring(0, document.getElementById(id).value.length - 1);
        }

    }
    
    
}

//Added by cc
export function maskMobileNumber(toMask) {
    if (toMask != undefined && toMask.length === 10) {
        toMask = toMask.replace(toMask.substring(0, toMask.length - 4), "xxxxxx");
    }
    return toMask;
}

export function isNoContainsSerialPattern(e) {
    if (e.length === 10) {
        var anysix;
        var result = false;
        for (var i = 0; i < 5; i++) {
            anysix = e.substring(i, i + 6);
            result = isSerialNo(anysix);
            if (result) {
                return result;

            }
        }

    }
    else {
        return true;
    }

};

function isSerialNo(lastSix) {
    var ascending = 0, desc = 0;
    for (var i = 0; i < lastSix.length - 1; i++) {
        var fChar = lastSix.charAt(i);
        var secChar = lastSix.charAt(i + 1);
        var first = parseInt(fChar);
        var second = parseInt(secChar);
        if (first < second) {
            if (!(second - first === 1)) {
                break;
            } else {

                ascending++;

            }
        } else if (first > second) {

            if (!(first - second === 1 || second === 0 || second === '0')) {
                break;
            } else {
                desc++;
            }
        }
    }
    if (ascending == (lastSix.length - 1) || desc == (lastSix.length - 1)) {
        return true;
    } else {
        return false;
    }

}

export function referenceMobileNoValidation(mobileNo) {

    if (mobileNo.length === 10) {
        if (!(mobileNo.charAt(0) === "9"
            || mobileNo.charAt(0) === "8" || mobileNo.charAt(0) === "7"
            || mobileNo.charAt(0) === "6")) {

            return false;
        } else {
            return true;
        }
    } else {

        return false;
    }

}

export function isValidEmail(email) {
    var atPos = email.indexOf("@");
    var domain = email.substring(parseInt(atPos) + 1, email.length);
    //Write Domain Logic pending
    if (email.length > 0
        && (email.includes(".@")
            || email.includes("@.")
            || !email.includes("@")
            || !email.includes(".")
            || email.includes("..")
            || email.includes(" ")
            || email.startsWith("@")
            || email.endsWith("@")
            || email.startsWith(".")
            || email.endsWith("."))) {
        return false;
    }

    else {
        var countATR = 0;
        for (var i = 0; i < email.length; i++) {
            if (email.charAt(i) == '@') {
                countATR++;
            }
        }
        var afterATR = email.substring(email.indexOf("@"), email.length);

        var countDOT = 0;
        for (var i = 0; i < afterATR.length; i++) {
            if (afterATR.charAt(i) == '.') {
                countDOT++;
            }
        }

        if (countATR === 1 && (countDOT === 1 || countDOT === 2)) {
            //Check Validation of Email Pending
           // const regex = /^[a-zA-Z0-9\\+\\.\\_\\%\\-\\+]{1,256} \\@[a-zA-Z0-9][a-zA-Z0-9\\-]{0,64}(\\.[a-zA-Z0-9][a-zA-Z0-9\\-]{0,25})+$/;
const regex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            var response = !isNullEmpty(email) && regex.test(email);
            return response;
        } else {
            return false;
        }
    }

}

export function validateVerhoeff(num) {

    if (isAdhaarMasked(num)) {
        return true;
    }

    var p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
        [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
        [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
        [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]];
        var d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
        [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
        [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
        [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
    var c = 0;
    var myArray = []
    myArray = StringToReversedIntArray(num);

    for (let i = 0; i < myArray.length; i++) {
        c = d[c][p[(i % 8)][myArray[i]]];
    }

    return (c == 0);
}

function StringToReversedIntArray(num) {

    var myArray = []
    for (let i = 0; i < num.length; i++) {
        const element = num.substring(i, i + 1);
        myArray.push(parseInt(element))

    }
    myArray = Reverse(myArray);
    return myArray;
}

function isAdhaarMasked(num) {
    try {
        var x = parseFloat(num);
        return false;
    }
    catch (e) {
        return true;
    }
}

function Reverse(myArray) {
    var reversed = []
    for (let i = 0; i < myArray.length; i++) {
        reversed.push(myArray[myArray.length - (i + 1)])
    }
    return reversed;
}


