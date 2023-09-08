import React, {Component} from 'react';

class AdminNavBar extends Component {

    render() {
        return (
            <div className="container">
                <div className="statButtons">
                    <button className="btn btn-primary" onClick={() => this.getAllOrganisations()}>Organisations</button>
                    <button className="btn btn-primary" onClick={() => this.getAllDepts()}>Depts</button>
                    <button className="btn btn-primary" onClick={() => this.getAllEmployees()}>Employees</button>
                    <button className="btn btn-primary" onClick={() => this.getAllSubjects()}>Subjects</button>
                    <button className="btn btn-primary" onClick={() => this.getAllTimeTables()}>TimeTables</button>
                    <button className="btn btn-primary" onClick={() => this.createNewTimeTable()}>New TimeTable</button>
                </div>
            </div>
        )
    }

    getAllSubjects() {
        console.log("get subjects clicked");
        this.props.history.push('/subjects');
    }

    getAllDepts() {
        console.log("get depts clicked");
        this.props.history.push('/depts');
    }

    getAllOrganisations() {
        console.log("get organisations clicked");
        this.props.history.push('/organisations');
    }

    getAllEmployees() {
        console.log("get employee clicked");
        this.props.history.push('/employees');
    }

    getAllTimeTables() {
        console.log("get timetable clicked");
        this.props.history.push('/time_tables');
    }

    createNewTimeTable() {
        console.log("new timetable");
        this.props.history.push('/time_tables/-1')
    }
}

export default AdminNavBar