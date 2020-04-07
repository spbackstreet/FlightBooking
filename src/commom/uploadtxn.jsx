import config from '../../config';
import APIRouter from './ApiRouter';
import {getHttpStatus} from '../../../Common/JS/constants';
import { numcheck } from "../../../Common/JS/commonvalidation";
import { Encrypt, decryptData, EncryptNew } from '../../../Common/JS/Encryption-Decryption';
import PrintReceiptUsingBTWiFiPrinterReqModel from '../Modal/PrintReceiptUsingBTWiFiPrinterReqModel';
import { confirmAlert } from 'react-confirm-alert';


export async function UploadTxnData (ctx , vtopupRechargeDetailsModel)  {

      if(config.planType === 'R'){
          config.OrderType = 'RECHARGE'
      }
      else if(config.planType === 'T'){
          config.OrderType = 'TOPUP'
      }
      else if(config.planType === 'A'){
          config.OrderType = 'ADDON'
      }

      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      var Finaldate = (date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec);
      config.LogonTime = (date + "/" + month + "/" + year + " " + hours + ":" + min + ":" + sec)
      var dtstring=(date +""+ month +""+ year )
      var Request = {
        "CAF": config.planType,
        "Guid": config.guid,
        "StoreNo": config.storeID,
        "Toast": "98697523",
        "TxnInfo": {
          "PromoDiscountCouponDetails": [
          ],
          "PromoList": [
          ],
          "TxnHeader": {
            "Area": "",
            "BalanceLoyaltyPoints": "0.0",
            "BillOfSupply": "",
            "BlockNo": "",
            "BuildingName": "",
            "ChangeDue": "0.00",
            "City": "",
            "ContactNumber": "",
            "CouponID": "",
            "CouponType": "",
            "CouponValue": "0.00",
            "CouponValueParam": "",
            "CouponValueType": "",
            "CurReferenceID": "1",
            "CustomerID": "",
            "CustomerName": "",
            "DeviceId": config.storeID + config.posid,
            "DoctorsAdd1": "",
            "DoctorsAdd2": "",
            "DoctorsAdd3": "",
            "DoctorsName": "",
            "ESOrderID": config.ORN,
            "EmailID": "",
            "EmailId": "",
            "FlatNo": "",
            "FloorNo": "",
            "IDProofCaptureStatus": "",
            "IsAddressCaptured": "",
            "IsCouponApplied": "",
            "IsIDProofRequiredFlag": "",
            "IsLoyaltyCardCaptured": "",
            "IsLoyaltyRedeemed": "",
            "IsValidLoyaltyRedemption": "",
            "IsVatExtra": "false",
            "ItemCount": "1",
            "LogonTime": config.LogonTime,
            "LoyaltyCardNumber": "",
            "MNP_MSISDN": "",
            "OrderType": config.OrderType,
            "PanCardNo": "",
            "PatientsAdd1": "",
            "PatientsAdd2": "",
            "PatientsAdd3": "",
            "PatientsName": "",
            "PaymentEndTime": Finaldate,
            "PaymentStartTime": Finaldate,
            "Pincode": "",
            "PlotNo": "",
            "ProductVersion": "10.4.7",
            "PromoTotal": "0.00",
            "ReceiptRefID": config.storeID + config.posid+"0005"+dtstring,
            "ReceiptTextPath": "C:\\RPOSStoreReceipt\\"+dtstring+"\\"+config.storeID + config.posid+"0005"+dtstring+".txt",
            "RedeemAmount": "",
            "RefundTxnSupervisorID": "",
            "RoundOffAmount": "0.00",
            "RoundOffConfigValue": "0.50",
            "Sector": "",
            "SocietyName": "",
            "State": "",
            "Street": "",
            "Supply_State_Code": "27",
            "TaxInvoice": config.TaxInvoice,
            "TaxableAmount": "0.00",
            "TransactionType": "SALE",
            "TxnAppliedDiscValue": "0.00",
            "TxnCouponSupervisorID": "",
            "TxnDiscAppliedTime": "",
            "TxnDiscSupervisorID": "",
            "TxnDiscValue": "",
            "TxnDiscValueFlag": "",
            "TxnEndTime": Finaldate,
            "TxnId": config.TxnID,
          // "TxnId": "2",
            "TxnMarkDownReason": "",
            "TxnMarkDownReasonDesc": "",
            "TxnSalesManID": "",
            "TxnStartTime": config.LogonTime,
            "TxnStatus": "COMPLETED",
            "TxnTotal": config.dPlanAmount,
            "UserId": config.userID,
            "VoidTxnSupervisorID": "",
            "ZONE":"",
            "isMDTApplied": ""
          },
          "TxnItemList": [
            {
              "BatchNumber": "",
              "Colorcode": "0",
              "CouponID": "",
              "CouponSupervisorID": "",
              "CouponType": "",
              "CouponValue": "",
              "CouponValueParam": "",
              "CouponValueType": "",
              "DeliveryLocation": "",
              "DeliveryLocationId": "",
              "Description": vtopupRechargeDetailsModel.lstPlans[0].planDesc,
              "DiscountAmount": "0.00",
              "DiscountID": "",
              "DiscountPercentage": "0.00",
              "DiscountWithQty": "0.00",
              "EffectivePrice": config.dPlanAmount,
              "EmbeddedTotalPrice": "0.00",
              "EnterEANorSKU":  vtopupRechargeDetailsModel.lstPlans[0].planId,
              "EntryMethod": "S",
              "ExpectedDeliveryDate": "",
              "ExpectedDeliveryTime": "",
              "ExpiryDate": "",
              "Extnd_bckt_nbr": "0",
              "Extnd_prom_nbr": "0",
              "HSN_CODE": "998422",
              "IsCouponApplied": "0",
              "ItemDiscAppliedTime": "",
              "ItemEmpDiscSupervisorID": "",
              "ItemEmployeeDiscount": "0.00",
              "ItemMarkDownDescription": "",
              "ItemMarkDownDiscountFlag": "",
              "ItemMarkDownDiscountParam": "0.00",
              "ItemMarkDownDiscountValue": "0.00",
              "ItemMarkDownReason": "",
              "ItemMarkDownSupervisorID": "",
              "ItemMesurementType": "MEASURE_TYPE_QUANTITY",
              "ItemSellingPrice": config.dPlanAmount,
              "ItemType": "TYPE_GRAB_AND_GO",
              "ItemUnitPriceAfterDiscount": config.dPlanAmount,
              "LnkItemList": [
              ],
              "LocationType": "",
              "MDIAppliedDateTime": "",
              "MD_FG": "0",
              "MaximumQuantity": "1",
              "OrgPrice": config.dPlanAmount,
              "OrgSeqId": "",
              "OriginalBarcode": "",
              "OriginalPriceWithQty": config.dPlanAmount,
              "OtherDiscounts": "0.00",
              "ParentReferenceID": "",
              "PosMsgDetails": [
              ],
              "ProductID": vtopupRechargeDetailsModel.lstPlans[0].planId,
              "QtyChangeDateTime": "",
              "Quantity": "1",
              "QuantityAdded": "",
              "QuantityFlag": "0",
              "SalesManID": "",
              "ScanTime": Finaldate,
              "SellingPrice": config.dPlanAmount,
              "SequenceID": "1",
              "Status": "",
              "StockCheckRequired": "0",
              "StockCount": "",
              "StoreID": "",
              "Stylecode": "0",
              "SupervisorID": "",
              "TaxDetails": {
                "AddlDetailsList": [],
                "TaxCodeType": "TAX_TYPE_INCL",
                "TaxGSTList": [
                  {
                    "HSN_TYPE": "JOCG",
                    "SEQUENCEID_TAX": "1",
                    "TaxAmount": "38.21",
                    "TaxRate": "9"
                  },
                  {
                    "HSN_TYPE": "JOSG",
                    "SEQUENCEID_TAX": "1",
                    "TaxAmount": "38.21",
                    "TaxRate": "9"
                  }
                ],
                "TaxType": "TAX_TYPE_PERCENTAGE",
                "TaxableAmount": "424.58"
              },
              "TxnItemPromoDetails": [
              ],
              "UnitOfMeasure": "EA",
              "ValidatedPosMsgId": "",
              "VoidSupervisorID": "",
              "VoidedDateTime": "",
              "isDiscountApplied": "0",
              "isLinkedItemsPresentFlag": "0",
              "isMDIApplied": "0",
              "isPromotionAvailableFlag": "0",
              "isTradeInItem": "0",
              "isVoidAllowed": "0",
              "itm_point": "0",
              "prom_nbr": "0"
            }
          ],
          "TxnTenderList": [
            {
              "Amount": config.dPlanAmount,
              "Description": "CASH",
              "MOPID": "1",
              "ReceiptTypeDescription": "CASH",
              "Status": "SUCCESS",
              "TenderMode": "DEBIT",
              "Type": "TENDERTYPE_CASH"
            }
          ]
        },
        "objRechargeTopUpAddonRequest": {
          "AccountId": "500000023246",
          "AccountType": "",
          "AgentState": config.Store_State,
          "Amount": config.dPlanAmount,
          "BillPayEAN": vtopupRechargeDetailsModel.lstPlans[0].planId,
          "CompanyCode": "",
          "CustomerId": "",
          "Customer_Circle": config.userCircelId,
          "DataChargingID": "",
          "DataServiceType": "",
          "DataserviceID": "",
          "Email": "",
          "Jioroute": config.jioRoute,
          "MSISDN": config.mobile,
          "Mop": "1",
          "ORN": config.ORN,
          "PGTranId": "",
          "Productstate": "",
          "ServiceId": config.mobile,
          "StockType": "0",
          "SubscriptionType": "",
          "VoicServiceID": "",
          "VoiceChargingID": "",
          "VoiceSrviceType": "",
          "circleId": config.agentCircleId
        }
      }


      var api = new APIRouter();
      if(config.NewEncryption===true)
      {
      this.props.setState({ loading: true });
      var APIURL = config.lstGrpMS.filter(
      (item) => item.MICROSERVICENAME == 'UploadTxnData')
      var responseJson = await api.postApiCalNewEncryption(Request.state, APIURL[0].ZONEURL+APIURL[0].MICROSERVICENAME);
      }
      else{
     this.props.setState({ loading: true });
     var APIURL = config.lstGrpMS.filter(
     (item) => item.MICROSERVICENAME == 'UploadTxnData')
     var responseJson = await api.postApiCalStoreID(Request.state, APIURL[0].ZONEURL+APIURL[0].MICROSERVICENAME);
      }
      if (numcheck(responseJson)) {
        confirmAlert({
            title : "Alert!",
            message: getHttpStatus(responseJson),
            buttons: [
                {
                    label: 'OK',
                    onClick: () => { return false }
                }
            ]
        });
    }
    else {

        if (responseJson.Errorcode === '0' || responseJson.Errorcode === '00') {
          this.props.props.history.push({
                  pathname: '/Thankyou',
                  state: {

                  }
              })

        } else {

          this.confirmAlertMsg(responseJson.Statusmsg, "");
          return false;

        }
    }

  }


