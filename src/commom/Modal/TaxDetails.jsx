
import React, { Component } from "react";
import { Model } from 'react-axiom';
class TaxDetails extends Model {

    static defaultState() {
        return {
            
            TaxGSTList :[],
            TaxCodeType: "",
            TaxType: "",
            AddlDetailsList :[],
            TaxId: "",
            TaxRate: "",
            TaxAmount: "",
            TaxChar: "",
            TaxableAmount: "",
            TaxDesc: "",
        }
    }
}

export default TaxDetails;
