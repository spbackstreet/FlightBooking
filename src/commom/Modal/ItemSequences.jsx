import React, { Component } from "react";
import { Model } from 'react-axiom';

class ItemSequences extends Model {

    static defaultState() {
        return {
            
            Item_Sequence_Id : "",
        }
    }
}

export default ItemSequences;