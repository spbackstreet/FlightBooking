import React, { Component } from "react";


class POIModel extends React.Component {
  PhotoCount;
  ViewToCapture;
  PROOF_REUSE;
  DocName;
  docdesc;
  issuingauth = "";
  doctypecode = "";
  docNumber = "";
  dateOfIssue = "";
  placeOfIssue = "";
  isAadharKYC = false;
  custPhotoCaptureTime;
  custLat = "";
  custLong = "";
  custPOITime;
  custPOILat = "";
  custPOILong = "";
  custPOISecondLat = "";
  custPOISecondLong = "";
  custPOATime = "";
  custPOALat = "";
  custPOALong = "";
  QR_SCAN_FLAG = "";
  mOrnNumber = "";
  FM_LOWERSCORE;
  FM_UPPERSCORE;
  FM_LOWERSCORE_AR;
  FM_HV_LOWERSCORE_NA;
  FM_HV_UPPERSCORE_NA;
  Aspect_ratio;

  //Added by @pushkar for vishwam corp START
  FM_VM_LOWERSCORE;
  FM_VM_UPPERSCORE;
  FM_VM_LOWERSCORE_NA;
  FM_VM_UPPERSCORE_NA;
  qrScannedData = "";
  shouldCallValidateHyperVerge = false;
  PANCardNoOTT = "";
  //END
  IsDateOfIssue = "";
  IsPlaceOfIssue = "";
  IsSameAsPOI = "";
  //Added by Neelam
  sdkUsed = "";
  //Added by Bhushan
  IS_OCR = "";
  isRed = false;
  CAFNo;
  tvCafNo;
  custImage = "";
  custImagePath = "";
  //Added by @Pushkar Dkyc changes START
  agentPhotoCaptureTime;
  agentPicLat = "";
  agentPicLong = "";
  agentImage = "";
  otpLR = "";
  otpLRLat = "";
  otpLRLong = "";
  otpLRValidatetime = "";
  otpLRGenerateTime = "";
  otpLRNumber = "";
  //END
  issuingAuthority;
  //for hyperverge
  POI_Response = "";
  POA_Response = "";
  face_match_Response = "";
  face_liveliness = "";
  face_liveliness_agent = "";
  face_match = "";
  face_live = "";
  face_live_agent = "";
  //for hyperverge
  Hyperverge_POI_1_Img_Path;
  Hyperverge_POI_2_Img_Path;
  Hyperverge_POA_1_Img_Path;
  Hyperverge_POA_2_Img_Path;
  Hyperverge_Cust_IMg_Path;
  custImageTV = "";

  HV_FM_AgentCust;
  //Added by @Pushkar for Vishwam corp
  VM_FM_AgentCust;
  face_match_agentCust_Response = "";
  //added by neelam 
  poiImage;
  poaImage;

  setpoiImage(poiImage) {
    this.poiImage = poiImage;
  }
  setpoaImage(poaImage) {
    this.poaImage = poaImage;
  }
  setcustImage(custImage) {
    this.custImage = custImage;
  }
  
  //end





  setFM_VM_LOWERSCORE(FM_VM_LOWERSCORE) {
    this.FM_VM_LOWERSCORE = FM_VM_LOWERSCORE;
  }



  setFM_VM_UPPERSCORE(FM_VM_UPPERSCORE) {
    this.FM_VM_UPPERSCORE = FM_VM_UPPERSCORE;
  }



  setFM_VM_LOWERSCORE_NA(FM_VM_LOWERSCORE_NA) {
    this.FM_VM_LOWERSCORE_NA = FM_VM_LOWERSCORE_NA;
  }


  setFM_VM_UPPERSCORE_NA(FM_VM_UPPERSCORE_NA) {
    this.FM_VM_UPPERSCORE_NA = FM_VM_UPPERSCORE_NA;
  }




  setAspect_ratio(aspect_ratio) {
    this.Aspect_ratio = aspect_ratio;
  }



  setFM_HV_LOWERSCORE_NA(FM_HV_LOWERSCORE_NA) {
    this.FM_HV_LOWERSCORE_NA = FM_HV_LOWERSCORE_NA;
  }


  setFM_HV_UPPERSCORE_NA(FM_HV_UPPERSCORE_NA) {
    this.FM_HV_UPPERSCORE_NA = FM_HV_UPPERSCORE_NA;
  }





  setHV_FM_AgentCust(HV_FM_AgentCust) {
    this.HV_FM_AgentCust = HV_FM_AgentCust;
  }




  setTvCafNo(tvCafNo) {
    this.tvCafNo = tvCafNo;
  }



  setIS_OCR(IS_OCR) {
    this.IS_OCR = IS_OCR;
  }



  setOtpLRGenerateTime(otpLRGenerateTime) {
    this.otpLRGenerateTime = otpLRGenerateTime;
  }



  setSdkUsed(sdkUsed) {
    this.sdkUsed = sdkUsed;
  }



  setIsDateOfIssue(isDateOfIssue) {
    this.IsDateOfIssue = isDateOfIssue;
  }



  setIsPlaceOfIssue(isPlaceOfIssue) {
    this.IsPlaceOfIssue = isPlaceOfIssue;
  }



  setIsSameAsPOI(isSameAsPOI) {
    this.IsSameAsPOI = isSameAsPOI;
  }


  setCAFNo(CAFNo) {
    this.CAFNo = CAFNo;
  }




  setRed(red) {
    this.isRed = red;
  }



  setFM_LOWERSCORE_AR(FM_LOWERSCORE_AR) {
    this.FM_LOWERSCORE_AR = FM_LOWERSCORE_AR;
  }



  setFM_LOWERSCORE(FM_LOWERSCORE) {
    this.FM_LOWERSCORE = FM_LOWERSCORE;
  }



  setFM_UPPERSCORE(FM_UPPERSCORE) {
    this.FM_UPPERSCORE = FM_UPPERSCORE;
  }



  setmOrnNumber(mOrnNumber) {
    this.mOrnNumber = mOrnNumber;
  }



  setQR_SCAN_FLAG(QR_SCAN_FLAG) {
    this.QR_SCAN_FLG = QR_SCAN_FLAG;
  }



  



  setOtpLR(otpLR) {
    this.otpLR = otpLR;
  }

  setOtpLRLat(otpLRLat) {
    this.otpLRLat = otpLRLat;
  }


  setOtpLRLong(otpLRLong) {
    this.otpLRLong = otpLRLong;
  }


  setOtpLRValidatetime(otpLRValidatetime) {
    this.otpLRValidatetime = otpLRValidatetime;
  }



  setOtpLRNumber(otpLRNumber) {
    this.otpLRNumber = otpLRNumber;
  }


  setCustPhotoCaptureTime(custPhotoCaptureTime) {
    this.custPhotoCaptureTime = custPhotoCaptureTime;
  }



  setCustLat(custLat) {
    this.custLat = custLat;
  }



  setCustLong(custLong) {
    this.custLong = custLong;
  }



  setCustPOITime(custPOITime) {
    this.custPOITime = custPOITime;
  }



  setCustPOILat(custPOILat) {
    this.custPOILat = custPOILat;
  }


  setCustPOILong(custPOILong) {
    this.custPOILong = custPOILong;
  }


  setCustPOATime(custPOATime) {
    this.custPOATime = custPOATime;
  }


  setCustPOALat(custPOALat) {
    this.custPOALat = custPOALat;
  }


  setCustPOALong(custPOALong) {
    this.custPOALong = custPOALong;
  }



  setIssuingAuthority(issuingAuthority) {
    this.issuingAuthority = issuingAuthority;
  }

  setDocNumber(docNumber) {
    this.docNumber = docNumber;
  }



  setDateOfIssue(dateOfIssue) {
    this.dateOfIssue = dateOfIssue;
  }


  setPlaceOfIssue(placeOfIssue) {
    this.placeOfIssue = placeOfIssue;
  }


  setDocdesc(docdesc) {
    this.docdesc = docdesc;
  }



  setIssuingauth(issuingauth) {
    this.issuingauth = issuingauth;
  }


  setDoctypecode(doctypecode) {
    this.doctypecode = doctypecode;
  }




  setPhotoCount(PhotoCount) {
    this.PhotoCount = PhotoCount;
  }


  setViewToCapture(ViewToCapture) {
    this.ViewToCapture = ViewToCapture;
  }



  setPROOF_REUSE(PROOF_REUSE) {
    this.PROOF_REUSE = PROOF_REUSE;
  }


  setDocName(DocName) {
    this.DocName = DocName;
  }



  setAadharKYC(aadharKYC) {
    this.isAadharKYC = aadharKYC;
  }



  setCustImagePath(custImagePath) {
    this.custImagePath = custImagePath;
  }



  setCustPOISecondLat(custPOISecondLat) {
    this.custPOISecondLat = custPOISecondLat;
  }



  setCustPOISecondLong(custPOISecondLong) {
    this.custPOISecondLong = custPOISecondLong;
  }



  setPOI_Response(POI_Response) {
    this.POI_Response = POI_Response;
  }



  setPOA_Response(POA_Response) {
    this.POA_Response = POA_Response;
  }



  setFace_match_Response(face_match_Response) {
    this.face_match_Response = face_match_Response;
  }



  setFace_liveliness(face_liveliness) {
    this.face_liveliness = face_liveliness;
  }


  setFace_match(face_match) {
    this.face_match = face_match;
  }



  setFace_live(face_live) {
    this.face_live = face_live;
  }



  setHyperverge_POI_1_Img_Path(hyperverge_POI_1_Img_Path) {
    this.Hyperverge_POI_1_Img_Path = hyperverge_POI_1_Img_Path;
  }



  setHyperverge_POI_2_Img_Path(hyperverge_POI_2_Img_Path) {
    this.Hyperverge_POI_2_Img_Path = hyperverge_POI_2_Img_Path;
  }



  setHyperverge_POA_1_Img_Path(hyperverge_POA_1_Img_Path) {
    this.Hyperverge_POA_1_Img_Path = hyperverge_POA_1_Img_Path;
  }



  setHyperverge_POA_2_Img_Path(hyperverge_POA_2_Img_Path) {
    this.Hyperverge_POA_2_Img_Path = hyperverge_POA_2_Img_Path;
  }



  setHyperverge_Cust_IMg_Path(hyperverge_Cust_IMg_Path) {
    this.Hyperverge_Cust_IMg_Path = hyperverge_Cust_IMg_Path;
  }


  setFace_live_agent(face_live_agent) {
    this.face_live_agent = face_live_agent;
  }


  setFace_liveliness_agent(face_liveliness_agent) {
    this.face_liveliness_agent = face_liveliness_agent;
  }



  setAgentPicLat(agentPicLat) {
    this.agentPicLat = agentPicLat;
  }



  setAgentPicLong(agentPicLong) {
    this.agentPicLong = agentPicLong;
  }



  setAgentPhotoCaptureTime(agentPhotoCaptureTime) {
    this.agentPhotoCaptureTime = agentPhotoCaptureTime;
  }



  setAgentImage(agentImage) {
    this.agentImage = agentImage;
  }



  setCustImageTV(custImageTV) {
    this.custImageTV = custImageTV;
  }



  setFace_match_agentCust_Response(face_match_agentCust_Response) {
    this.face_match_agentCust_Response = face_match_agentCust_Response;
  }


  setVM_FM_AgentCust(VM_FM_AgentCust) {
    this.VM_FM_AgentCust = VM_FM_AgentCust;
  }


  setQrScannedData(qrScannedData) {
    this.qrScannedData = qrScannedData;
  }


  setShouldCallValidateHyperVerge(shouldCallValidateHyperVerge) {
    this.shouldCallValidateHyperVerge = shouldCallValidateHyperVerge;
  }


};
var GlobalPOIModel = new POIModel();
export default GlobalPOIModel;
