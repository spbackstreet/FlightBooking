import React, { Component } from "react";
import { Model } from 'react-axiom';
class LabourDetails extends Model {

    static defaultState() {
        return {
            MRPFlag: "",
            SkuNumber: "",
            LabourRate: "",
            LabourChargeTotal: "",
        }
    }
}
export default LabourDetails;
