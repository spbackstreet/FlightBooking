import React, {Component} from "react";

let PhotoCount;
let ViewToCapture;
let PROOF_REUSE;
let DocName = "";
let docdesc = "";
let issuingauth = "";
let doctypecode = "";

let docNumber = "";
let dateOfIssue = "";
let placeOfIssue = "";
let issuingAuthority = "";
let IsDateOfIssue = "";
let IsPlaceOfIssue = "";
let IsSameAsPOI = "";

let sdkUsed = "";
let IS_OCR = "";
let Aspect_ratio;

class POAModel  extends React.Component {


   //
       setAspect_ratio( aspect_ratio) {
           this.Aspect_ratio = aspect_ratio;
       }
   
      
      
   
   
   
     
   //
       setIS_OCR( IS_OCR) {
           this.IS_OCR = IS_OCR;
       }
   
     
     
   
   
      
   //
       setSdkUsed( sdkUsed) {
           this.sdkUsed = sdkUsed;
       }
   
      
   //
       setIsDateOfIssue( isDateOfIssue) {
           this.IsDateOfIssue = isDateOfIssue;
       }
   
      
   //
       setIsPlaceOfIssue( isPlaceOfIssue) {
           this.IsPlaceOfIssue = isPlaceOfIssue;
       }
   
      //
       setIsSameAsPOI( isSameAsPOI) {
           this.IsSameAsPOI = isSameAsPOI;
       }
   
      
      
      
   
      
   
   //
       setIssuingAuthority( issuingAuthority) {
           this.issuingAuthority = issuingAuthority;
       }
   
       
   //
       setDocNumber( docNumber) {
           this.docNumber = docNumber;
       }

   //
       setDateOfIssue( dateOfIssue) {
           this.dateOfIssue = dateOfIssue;
       }
   
      //
       setPlaceOfIssue( placeOfIssue) {
           this.placeOfIssue = placeOfIssue;
       }
   
       
   //
       setDocdesc( docdesc) {
           this.docdesc = docdesc;
       }
   
       //
       setIssuingauth( issuingauth) {
           this.issuingauth = issuingauth;
       }
   
       
   //
       setDoctypecode( doctypecode) {
           this.doctypecode = doctypecode;
       }
   
   
   //
       setPhotoCount( PhotoCount) {
           this.PhotoCount = PhotoCount;
       }
   
      
   //
       setViewToCapture( ViewToCapture) {
           this.ViewToCapture = ViewToCapture;
       }
   
       
   //
       setPROOF_REUSE( PROOF_REUSE) {
           this.PROOF_REUSE = PROOF_REUSE;
       }
   
       
   //
       setDocName( DocName) {
           this.DocName = DocName;
       }
   
       
   
       
   
};
var GlobalPOAModel = new POAModel();
export default GlobalPOAModel;
