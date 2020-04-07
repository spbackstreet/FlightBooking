import React, { Component } from "react";

class ORNModel extends React.Component {
    TransName;
    Guid;
    Storeid;

setTransName(){
    this.TransName='NO';
}

setGuid(guid){
    this.Guid=guid;
}

setStoreid(storeid){
    this.Storeid=storeid;
}


    
}

var GlobalORNModel = new ORNModel();
export default GlobalORNModel;