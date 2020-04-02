import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';
import './LazyLoader/css/LazyLoader.css';
import ErrorBoundary from './Common/JS/ErrorBoundary';
import BackgroundLoader from './BackgroundLoader';
const Home = React.lazy(() => import('./Home/View/Home'));


class App extends React.Component {

  componentDidCatch(err) {
    this.props.history.push({
      pathname: '/Home',
    });
  }
  render(){
  return (
<ErrorBoundary>
        <div>
          <React.Suspense fallback={<BackgroundLoader />}>
            <BrowserRouter>

                    <Route exact path="/" component={Home} />

            </BrowserRouter>
          </React.Suspense>
        </div>
      </ErrorBoundary>


  )
  }
}

export default App;

