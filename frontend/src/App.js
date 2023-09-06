import React, {Component} from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import SuperComponent from "./component/SuperComponent";

class App extends Component {

    render() {
        return (
            <div className="container" style={{textAlign: 'center'}}>
                <Router>
                    <div className="superComp" style={{margin: '5'}}>
                        <SuperComponent/>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;