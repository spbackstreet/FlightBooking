import React, { Component } from "react";
import { Model } from 'react-axiom';

class BillPlanChangeRequest extends Model {

    static defaultState() {
        return {
            Orn: "",
            Mop: "",
            PgTranId: "",
            BillPayEAN: "",
            PlanId: "",
            Amount: "",
            MSISDN: "",
            circleId: "",
            CustomerId: "",
            ServiceId: "",
            Email: "",
            AccountId: "",
            Customer_Circle: "",
            Jioroute: "",
            StockType: "",
            Existing_PlanId: "",
            Prime: "",
            PrimeId: "",
            customerCreditScore: "",
            CreditScoredate: "",

        }
    }
}

export default BillPlanChangeRequest