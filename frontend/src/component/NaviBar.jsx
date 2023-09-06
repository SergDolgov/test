import React, {Component} from 'react';
import logo from '../logo.svg';

class NaviBar extends Component {
    constructor(props) {
        super(props);
        this.goToStatistics = this.goToStatistics.bind(this);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                      <img src={logo} className="App-logo" alt="logo" />
                      <h1 className="App-title" onClick={() => this.goHome()}>Test React App</h1>
                </header>
            </div>
        )
    }

    async componentDidMount() {
        console.log("in navy bar " + this.state);
        console.log(this.props);
        this.setState({})
    }

    async goToStatistics() {
        console.log("in goToStatistics");
        this.props.history.push('/statistics');
    }

    async goHome() {
        console.log("in home");
        this.props.history.push('/');
    }
}

export default NaviBar