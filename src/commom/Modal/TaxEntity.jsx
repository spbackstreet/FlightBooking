import React, { Component } from "react";
import { Model } from 'react-axiom';

class TaxEntity extends Model {

    static defaultState() {
        return {
            hsnType: "",
            hsnCode: "",
            taxRate: "",
            taxAmount: "",
            taxableAmount: "",
            taxType: "",
            taxCodeType: "",
            sellingPriceAfterTax: "",
            sellingPriceBeforeTax: "",
            quantity: "",
            sequenceID: "",
            productID: "",
            md_fg: "",

        }
    }
}
export default TaxEntity;