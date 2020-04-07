import config from '../config';

const objRechargeTopUpAddonRequest = {
    AccountId: "500000023246",
    AccountType: "",
    AgentState: config.Store_State,
    Amount: config.dPlanAmount,
    BillPayEAN: config.vtopupRechargeDetailsModel.lstPlans[0].planId,
    CompanyCode: "",
    CustomerId: "",
    Customer_Circle: config.userCircelId,
    DataChargingID: "",
    DataServiceType: "",
    DataserviceID: "",
    Email: "",
    Jioroute: config.jioRoute,
    MSISDN: config.mobile,
    Mop: "1",
    ORN: config.ORN,
    PGTranId: "",
    Productstate: "",
    ServiceId: config.mobile,
    StockType: "0",
    SubscriptionType: "",
    VoicServiceID: "",
    VoiceChargingID: "",
    VoiceSrviceType: "",
    circleId: config.agentCircleId
}
export default objRechargeTopUpAddonRequest;