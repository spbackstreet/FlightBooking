import React, { Component } from "react";
import { Model } from 'react-axiom';

class HomeMenuModel extends Model {

    static defaultState() {
        return {

            storeId:"",
            agentId:"",
            zone:"",
            roleId:"",
            guid:""


        };
    }



}


export default HomeMenuModel;
