
import React, { Component } from "react";
import { Model } from 'react-axiom' ;
class MetalRates extends Model {

    static defaultState() {
        return {
            GOLDRATES : "",
            SILVERRATES : "",
            COMPLEXITY : "",
        }
    }
}
export default MetalRates;