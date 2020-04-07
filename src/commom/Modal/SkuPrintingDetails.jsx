
import React, { Component } from "react";
import { Model } from 'react-axiom';
class SkuPrintingDetails extends Model {

    static defaultState() {
        return {

            BROKENSETSKU: "",
            SKUNUMBER: "",
            NETQTY: "",
            UNITID: "",
            QTY: "",
            ECORESCONFIGURATIONNAME: "",
            INVENTLOCATIONID: "",
            DESIGNNUMBER: "",
            DMDQTY: "",
            SETITEMID: "",
            STNQTY: "",
            SETSKUNUMBER: "",

        }
    }
}

export default SkuPrintingDetails;