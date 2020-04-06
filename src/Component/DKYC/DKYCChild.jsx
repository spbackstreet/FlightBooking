import { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { default as APIRouter, default as ApiRouter } from '../../ApiRouter';
// import GlobalORNModel from '../Model/ORNModel';
// import { getHttpStatus } from '../../Common/JS/constants';
// import GlobalPOIModel from '../Model/POIModel';
import config from '../../config';

let that;


class DKYCChild extends Component
{
    constructor(props) {
    super(props);
    that = this;

  }
    handleMyChange(frm) {
        console.log("handle change form", frm.target.value);
        frm.preventDefault()
        console.log("PROPS2", that.props.state);
        that.props.selectJourney = frm.target.value;
        that.props.selectedDocObject = '';
        that.props.setState({
          selectJourney: frm.target.value,
          selectedDocObject: ''
        })
    
        if (frm.target.value == "option1") {
          that.fetchPoiPoaTask(true, frm);
          config.isAadharKYC = true;
        }
        else {
    
          that.fetchPoiPoaTask(false, frm);
          config.isAadharKYC = false;
        }
    
      }





      async fetchPoiPoaTask(isAadhaar, frm) {
        if (isAadhaar) {
        //   GlobalPOIModel.setAadharKYC(true);
        } else {
        //   GlobalPOIModel.setAadharKYC(false);
    
        }
        console.log("fetchPoiPoaTaskcalled", "Called")
     
    
        var aadhaarJourney = "O";
        if (isAadhaar) {
          aadhaarJourney = "A";
        }
        var request = {
          "Guid": (config.objDeviceSave.Msg),
          "Storeid": (config.objGetStore.StoreID),
          "AgentId": config.userID,
          "IsAadharKyc": aadhaarJourney,
          "CircleId": (config.objSupervisorLogin.Circle_Response.CircleId)
    
        }
    
    
        var api = new APIRouter();
    
        if(config.NewEncryption===true)
        {
        this.props.setState({ loading: true });
        var APIURL = config.lstGrpMS.filter(
        (item) => item.MICROSERVICENAME == 'GetPOAPOIMaster')
        var response1 = await api.postApiCalNewEncryption(request, APIURL[0].ZONEURL+APIURL[0].MICROSERVICENAME);
        }
        else{
       this.props.setState({ loading: true });
       var APIURL = config.lstGrpMS.filter(
       (item) => item.MICROSERVICENAME == 'GetPOAPOIMaster')
       var response1 = await api.postApiCalStoreID(request, APIURL[0].ZONEURL+APIURL[0].MICROSERVICENAME);
        }
    
         if (//numcheck(
             response1
             //)
             ) {
          this.props.setState({ loading: false });
          confirmAlert({
    
              //message: getHttpStatus(response1),
              buttons: [
                  {
                      label: 'OK',
                      onClick: () => { return false }
                  }
              ]
          });
      }
      else{
        console.log("PoiListRepsonse", response1);
    
    
      
        that.props.setState({ loading: false })
    
      
    
        if (response1.Error_Code === '00') {
    
          //set up spinner
          var showDiv = false;
          var showDoc = true;
          if (isAadhaar) {
            showDiv = true;
            showDoc = false
          }
          console.log("POIList", response1.lstPOI)
          that.props.state.selectedDocObject = (response1.lstPOI)[1]
          console.log("selectedDocObject", that.props.state.selectedDocObject)
    
          that.props.setState({
            showQrDiv: showDiv,
            showDocView: showDoc,
            poiList: response1.lstPOI,
            poaList: response1.lstPOA,
            selectedDocObject: (response1.lstPOI)[1]
          })
          that.props.state.showQrDiv = showDiv;
          that.props.state.showDocView = showDoc;
          that.props.state.poiList = response1.lstPOI;
          that.props.state.poaList = response1.lstPOA;
          that.props.state.selectedDocObject = (response1.lstPOI)[1]
    
    
          //end
    
    
    
    
        }
        else if(response1.ErrorCode === '03' || response1.ErrorCode === '3'){
          confirmAlert({
              title : "Alert!",
              message: response1.ErrorMsg,
              buttons: [
                  {
                      label: 'OK',
                      onClick: () => { 
                       //   logout(this, this.props,config); 
                        }
                  }
              ]
          });
    
      }
        else {
    
      
    
    
        }
    
      }
      }


      
}

export default DKYCChild;
