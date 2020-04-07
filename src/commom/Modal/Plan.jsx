import React, { Component } from "react";
import { Model } from 'react-axiom';

class Plan extends Model {

    static defaultState() {
        return {

            planId: "",
            planPrice: "",
            planDesc: "",
            isAdvPayment: "",
            originalPrice: "",
            rjilPrice: "0.00",
            rjmlPrice: "0.00"
        };
    }



}


export default Plan;
