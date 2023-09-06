import React, {Component} from 'react';

class AdminNavBar extends Component {

    render() {
        return (
            <div className="container">
                <div className="statButtons">
                    <button className="btn btn-primary" onClick={() => this.getAllMessages()}>Messages</button>
                    <button className="btn btn-primary" onClick={() => this.getAllOrganisations()}>Organisations</button>
                    <button className="btn btn-primary" onClick={() => this.getAllEmployees()}>Employees</button>
                    <button className="btn btn-primary" onClick={() => this.createNewInvoice()}>New invoice</button>
                </div>
            </div>
        )
    }

    getAllMessages() {
        console.log("get com clicked");
        this.props.history.push('/messages');
    }

    getAllOrganisations() {
        console.log("get organisations clicked");
        this.props.history.push('/organisations');
    }

    getAllEmployees() {
        console.log("get employee clicked");
        this.props.history.push('/employees');
    }
    createNewInvoice() {
        console.log("new invoice");
        this.props.history.push('/invoices/-1')
    }
}

export default AdminNavBar