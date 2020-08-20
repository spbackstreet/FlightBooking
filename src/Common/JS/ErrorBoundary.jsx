import React, { Component } from 'react';

import {BrowserRouter, Route, Switch, withRouter} from 'react-router-dom';

 

class ErrorBoundary extends React.Component {

    constructor(props) {

      super(props);

      this.state = { hasError: false };

    }

  

    componentDidCatch(error, info) {

      // Display fallback UI

      this.setState({ hasError: true });

      

    }

  

    render() {

      if (this.state.hasError) {

        // You can render any custom fallback UI

        return <h2>Error occurred!!! please contact administrator.</h2>;

      }

      return this.props.children;

    }

  }

 

  export default withRouter(ErrorBoundary);

 