
import React, { Component } from "react";
import { Model } from 'react-axiom';
class AddlDetailsList extends Model {

    static defaultState() {
        return {
            
            AddlTax_Amount: "",
            AddlTax_Rate: "",
            AddlTax_ID: "",
            AddlTax_Type: "",
            AddlTaxIsSubTax: "",
            AddlTax_Desc: "",
        }
    }
}
export default AddlDetailsList;