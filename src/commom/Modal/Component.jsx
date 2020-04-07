import React, { Component } from "react";
import { Model } from 'react-axiom';
class Component extends Model {

    static defaultState() {
        return {
            Pcs: "",
            SKUNUMBER: "",
            Discount: "",
            Size: "",
            Color: "",
            MRP: "",
            NetWeight: "",
            ItemId: "",
            COMPSEQID: "",
            component: "",
            UOM: "",
            compRate: "",
            MetalType: "",
            comp_cvalue: "",

        }
    }
}
export default Component;