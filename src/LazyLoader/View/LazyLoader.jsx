import React, { Component } from 'react';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';

import '../css/LazyLoader.css'

class LazyLoader extends Component {

    //test

    constructor(props) {
        super(props);
    }

    render = () => {

        return (
            <Router>
            <div class='container loading'>
                <div class='img-container'>
                    <div class='img'>
                    </div>
                </div>
                <div class='content'>
                    <div class='stripe small-stripe'>
                    </div>
                    <div class='stripe medium-stripe'>
                    </div>
                    <div class='stripe long-stripe'>
                    </div>
                </div>
            </div>
            </Router>
        )
    }
}

export default LazyLoader;