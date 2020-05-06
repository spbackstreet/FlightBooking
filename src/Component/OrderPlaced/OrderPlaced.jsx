import React, { useEffect, useState } from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import { confirmAlert } from 'react-confirm-alert';
import { Scrollbars } from 'react-custom-scrollbars';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-spinner-material';
import SimpleReactValidator from 'simple-react-validator';
import { errorMsg } from '../../commom/errorMsg';
import { FixedHeader } from '../../commom/FixedHeader';
import PlanselectionModel from '../../commom/Modal/PlanselectionModel';
import config from '../../config';
import '../../css/style.css';
import useGlobalState from '../../hooks/useGlobalState';
import useLoader from '../../hooks/useLoader';
import validateICCIDservice from '../../services/validateICCIDservice';
import getMNPservice from '../../services/getMNPservice';
import vanityNumberservice from '../../services/vanityNumberservice';
import getCustAdd from '../../services/getCustAdd.js';
import getStoreAdd from '../../services/getStoreAdd';
import { makeStyles, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography, FormControlLabel } from "@material-ui/core";

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import './OrderPlaced.css';
import * as qs from 'query-string';


const useStyles = makeStyles(theme => ({
    cardUI: {
        maxWidth: "345",
        margin: "10px",
        boxshadow: "0 4px 8px 0 rgba(52, 95, 140)",

    },
    media: {
        height: "auto",
        background: "#f2e1ae",
        padding: "5px",
        textAlign: "left",
    },
    marginT: {
        marginTop: "200px"
    },
    mediaBody: {
        height: "auto",
        background: "#f0e9d5",
        padding: "5px",
        textAlign: "left",
    },
    cardbodynew : {
        height: "100vh",
        flex: "1 1 auto",
        minHeight: "1px",
        padding: "1.25rem",
        overflowY : "auto",
        background : "white"
    },
    textCenter : {
        textAlign : "center !important",
        marginLeft : "10px",
        marginRight :  "10px",
        boxSizing : "border-box",
    }
        
}))


const OrderPlaced =()=>{
    const classes = useStyles();
    const history = useHistory();
    const [triggerAction] = useLoader();
    const [varRefNo, setVarRefNo] = useState('')
    const [shipAddr, setShipAddr] = useState()
    const [storeAddr, setStoreAddr] = useState()

    const GetQueryString = async () => {
        const values = qs.parse(window.location.search);
        if (values === null || values.refNo === null) {
            confirmAlert({
                title: 'Alert!!',
                message: "Unable to fetch refNo",
                buttons: [
                    {
                        label: 'OK',
                        onClick: () => { return (false) }
                    },
                ]
            })
        }
        else {
            setVarRefNo(values.refNo)
            if (values.customerAddressId) {
                const custAddData = await triggerAction(() => getCustAdd({ mnumber: "7008124658", action_type: "FETCH", customerAddressId: values.customerAddressId }));
                if (custAddData && custAddData.customerAddress)
                    setShipAddr(custAddData.customerAddress[0]);
            }
            if (values.storeNo) {
                const storeAddData = await triggerAction(() => getStoreAdd("", values.storeNo));
                if (storeAddData && storeAddData.storeList)
                    setStoreAddr(storeAddData.storeList[0]);
            }
        }
    }


    useEffect(() => {
        GetQueryString()
    }, [])

return(
    <div className="rechargehome_wrapper">
    <div className="app-body">
        <div className="container">
            <div className="row">
            
                <div className="col">
                {FixedHeader()}
                    <div className={classes.cardbodynew}>

                        <div className="card-body">
                                <div className="status-frame text-center d-flex align-items-center">
                                    {/* <div className="text-center mx-auto"> */}
                                   
                                    <div className={classes.textCenter}>
                                        <div className="icon-page-status">
                                            <div className={classes.marginT}>
                                                <svg className="checkmark" viewBox="0 0 52 52" style={{ "margin-left": "140px",
    "margin-top": "230px"}}>
                                                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h6 className="supporting-c2 mt-3 mb-3 pb-3">
                                            <b>Your order #{config.successtxnid} has been placed!</b>
                                        </h6>

                                        <AccessTimeIcon /><b>Time placed :</b> {new Date().toLocaleString()}
                                        {/* 05/03/2020 11:13 */}

                                        {shipAddr ?
                                            <Card className={classes.cardUI}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.media}>
                                                        <LocationOnIcon /> <b>Shipping address</b>
                                                    </CardMedia>

                                                    <CardContent className={classes.mediaBody}>
                                                        {/* <Typography gutterBottom variant="h5" component="h2">
                                                        {shipAddr.address_type}
                                                    </Typography> */}
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            <b>{shipAddr.customer_name}</b><br></br>
                                                            {shipAddr.flat_no + " , Floor No. " + shipAddr.floor_no} <br></br>
                                                            {shipAddr.street} < br></br>
                                                            {shipAddr.city + " , " + shipAddr.state + " , " + shipAddr.pincode} <br></br>
                                                            <b>{"Ph. No. "}</b>{shipAddr.mobile_no} <br></br>
                                                            <b>{"Email "}</b> {shipAddr.email}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>

                                            </Card>
                                            : null}
                                        {storeAddr ?
                                            <Card className={classes.cardUI}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        className={classes.media}>
                                                        <LocationOnIcon /> <b>Pickup address</b>
                                                    </CardMedia>

                                                    <CardContent className={classes.mediaBody}>
                                                        <Typography variant="body2" color="textSecondary" component="p">
                                                            <b>{storeAddr.name}</b><br></br>
                                                            {storeAddr.address} <br></br>
                                                            <b>{"Distance "}</b> {storeAddr.distance} <br></br>
                                                            <b>{"Ph. No. "}</b>{storeAddr.contactNumber} <br></br>
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>

                                            </Card>
                                            : null}


                                        {/* <div className="row no-gutters mt-3 pt-3 md-font">
                                            <div className="col-4 text-left" style={{ "color": "green" }}>To Check your order details check My Orders</div>
                                        </div> */}
                                        {/* <hr style={{ "border": "1px solid green", "marginTop": "-2px" }}></hr> */}

                                        <br></br>
                                        <br></br>
                                        <div>
                                            <div className="row m-0 mb-4">
                                                <div className="col-12 p-2">
                                                    <button type="button" className="btn-block jio-btn jio-btn-primary" onClick={() => history.push('/category/Mobiles')} >OK</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>);
}


export default  OrderPlaced