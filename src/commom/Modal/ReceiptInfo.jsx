import React, { Component } from "react";
import { Model } from 'react-axiom';

class ReceiptInfo extends Model {

    static defaultState() {
        return {
            
            Barcode : "",
            Description : "",
            ID : "",
        }
    }
}

export default ReceiptInfo;