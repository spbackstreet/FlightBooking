import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
const Home = React.lazy(() => import('./Component/Home/Home'));
const DeliveryAddress = React.lazy(() => import('./Component/DeliveryAddress/DeliveryAddress'));
const PermanentAddress= React.lazy(() => import('./Component/PermanentAddress/PermanentAddress'));
const LocalReference= React.lazy(() => import('./Component/LocalRef/LocalReference'));
const DKYC= React.lazy(() => import('./Component/DKYC/DKYC'));
const CustomerDetails = React.lazy(() => import('./Component/CustomerDetails/CustomerDetails'));
const poicapture = React.lazy(() => import('./Component/POICapture/POICapture'));
const CapCustPhoto = React.lazy(() => import('./Component/CapCustPhoto/CapCustPhoto'));
const DKYCPOA = React.lazy(() => import('./Component/DKYCPOA/DKYCPOA'));
const Planselection = React.lazy(() => import('./Component/Planselection/Planselection'));
const CustOTP = React.lazy(() => import('./Component/CustOTP/CustOTP'))

const POACapture = React.lazy(() => import('./Component/POACapture/POACapture'));
// const LocalAddress = React.lazy(() => import('./components/LocalAddress/LocalAddress'));


const VideoCapture = React.lazy(() => import('./Component/VideoCapture/VideoCapture'));
const OrderPlaced =  React.lazy(() => import('./Component/OrderPlaced/OrderPlaced'));
  

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/deliveryAddress" component={DeliveryAddress} />
            <Route exact path="/permanentAddress" component={PermanentAddress} />
            <Route exact path="/localreference" component={LocalReference} />
            <Route exact path="/DKYC" component={DKYC} />
            <Route exact path="/CustomerDetails" component={CustomerDetails} />
            <Route exact path="/POICapture" component={poicapture} />
            <Route exact path="/DKYCPOA" component={DKYCPOA} />
            <Route exact path="/POACapture" component={POACapture} />
            {/* <Route exact path="/CapCustPhoto" component={CapCustPhoto} /> */}
            <Route exact path="/VideoCapture" component={VideoCapture} />
            <Route exact path="/CapCustPhoto" component={CapCustPhoto} />
            <Route exact path="/Planselection" component={Planselection} />
            <Route exact path  ="/OrderPlaced" component ={OrderPlaced}/>
             
            <Route exact path="/CustOTP" component={CustOTP} />
            
            <Redirect to='/' />
        </Switch>
    );
}

export default Routes;