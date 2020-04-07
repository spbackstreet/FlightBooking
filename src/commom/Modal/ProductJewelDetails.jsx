import React, { Component } from "react";
import { Model } from 'react-axiom';
class ProductJewelDetails extends Model {

    static defaultState() {
        return {
            skuDetails : "",
            subDeptID : "",
            labourDetails : "",
            MetalRates : "",
            component : [],
            skuPrintingDetails : "",
            DeptID : "",
            INTRNL_ID : ""
            
        }
    }
}
export default ProductJewelDetails