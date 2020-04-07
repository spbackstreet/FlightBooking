import React, { Component } from "react";
import { Model } from 'react-axiom';
class LnkItemList extends Model {

    static defaultState() {
        return {
            LinkedItemRefId:"",
        }
    }
}
export default LnkItemList;