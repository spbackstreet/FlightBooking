import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './css/App.css';

import { StateProvider } from './hooks/useGlobalState';
import LazyLoader from './LazyLoader';
import Routes from './Routes';
import Layout from './Layout';
import './services/axiosUtilService';



const Home = React.lazy(() => import('./Component/Home/Home'));


function App() {
  return (
    <>
      <React.Suspense fallback={<LazyLoader />}>
        <StateProvider>
          <Router>
            {/* <Layout> */}
              <Routes />
            {/* </Layout> */}
          </Router>
        </StateProvider>
      </React.Suspense>
    </>
  );
}

export default App;

