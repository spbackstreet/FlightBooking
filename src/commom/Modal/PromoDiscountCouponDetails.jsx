import React, { Component } from "react";
import { Model } from 'react-axiom';

class PromoDiscountCouponDetails extends Model {

    static defaultState() {
        return {
            PromoDiscountCouponName : "",
            EndDate : "",
            PromoDiscountCouponType : "",
            StartDate : "",
            PromoAmount : "",
            PromoDiscountCouponSupervisorID : "",
            PromoID : "",
            ItemSequences : [],
            PromoDiscountCouponId : "",
            PromoDiscountCouponValue : "",
            PromoDescription : "",
        }
    }
}
export default PromoDiscountCouponDetails;