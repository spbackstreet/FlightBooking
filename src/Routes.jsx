import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
const Home = React.lazy(() => import('./Component/Home/Home'));
const DeliveryAddress = React.lazy(() => import('./Component/DeliveryAddress/DeliveryAddress'));

// const LocalAddress = React.lazy(() => import('./components/LocalAddress/LocalAddress'));




const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/deliveryAddress" component={DeliveryAddress} />
           
            <Redirect to='/' />
        </Switch>
    );
}

export default Routes;