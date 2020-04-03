import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
const Home = React.lazy(() => import('./Component/Home/Home'));
// const LocalAddress = React.lazy(() => import('./components/LocalAddress/LocalAddress'));




const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/localAddress" component={LocalAddress} /> */}
           
            <Redirect to='/' />
        </Switch>
    );
}

export default Routes;