import React, { Component } from "react";
import { Model } from 'react-axiom';
class SkuDetails extends Model {

    static defaultState() {
        return {

            SkuNumber: "",
            Description: "",
            Configuration: "",
            Rate: "",
            WastagePercentage: "",
            WastageType: "",
            MRPflag: "",
            MakingRate: "",
            GoldWeight: "",
            GoldRate: "",
            Wastage: "",
            WastageAmount: "",
            MakingType: "",
            Pieces: "",
            MakingAmount: "",
            variant: "",
            inventproduct: "",
        }
    }
}
export default SkuDetails;