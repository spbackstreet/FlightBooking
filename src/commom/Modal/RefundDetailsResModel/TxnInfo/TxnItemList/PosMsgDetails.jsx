import React, { Component } from "react";
import { Model } from 'react-axiom';

class PosMsgDetails extends Model {

    static defaultState() {
        return {

            POSMsg_Id : "",
			POSMsg_Value : "",
        }
    }
}
export default PosMsgDetails