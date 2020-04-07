import React, { Component } from "react";
import { Model } from 'react-axiom';
class TaxGSTList extends Model {

    static defaultState() {
        return {
            HSN_TYPE: "",
            TaxRate: "",
            TaxAmount: "",
            SEQUENCEID_TAX: "",
        }
    }
}

export default TaxGSTList;