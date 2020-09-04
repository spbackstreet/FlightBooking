import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';
import './LazyLoader/css/LazyLoader.css';
import ErrorBoundary from './Common/JS/ErrorBoundary';
import BackgroundLoader from './BackgroundLoader';
const Signup = React.lazy(() => import('./Home/View/Signup'));
const Login = React.lazy(() => import('./Home/View/Login'));
const Home = React.lazy(() => import('./Home/View/Home'));
const Edit = React.lazy(() => import('./Home/View/Edit'));
const Graph = React.lazy(() => import('./Home/View/Graph'));


class App extends React.Component {

  componentDidCatch(err) {
    this.props.history.push({
      pathname: '/',
    });
  }
  render(){
  return (
<ErrorBoundary>
        <div>
          <React.Suspense fallback={<BackgroundLoader />}>
            <BrowserRouter>

                    <Route exact path="/" component={Login} />
                    <Route exact path="/Signup" component={Signup} />
                    <Route exact path="/Home" component={Home} />
                    <Route exact path="/Edit" component={Edit} />
                    <Route exact path="/Graph" component={Graph} />

            </BrowserRouter>
          </React.Suspense>
        </div>
      </ErrorBoundary>


  )
  }
}

export default App;

