import React, {Component} from 'react';
import TimeTableService from "../service/TimeTableService";

class TimeTableList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeTables: []
        };
        this.refreshTimeTables = this.refreshTimeTables.bind(this);
        this.updateTimeTableClicked = this.updateTimeTableClicked.bind(this);
        this.addTimeTableClicked = this.addTimeTableClicked.bind(this);
    }

    componentDidMount() {
        this.refreshTimeTables();
    }

    refreshTimeTables() {
        TimeTableService.getAllTimeTables().then(
            response => {
                console.log(response.data.content);
                this.setState({timeTables: response.data.content});
            }
        )
    }

    updateTimeTableClicked(id) {
        console.log("update timeTable id = ", id);
        this.props.history.push('/time_tables/' + id);
    }

    addTimeTableClicked() {
        console.log('add clicked');
        this.props.history.push('/time_tables/-1')
    }

    render() {
        return (
            <div className="container">
                <h3>All TimeTables</h3>
                <div className="container">
                    <table className="table" style={{width: '90%'}}>
                        <thead>
                        <tr>
                            <th>N</th>
                            <th>Dept</th>
                            <th>DayOfWeek</th>
                            <th>Subject</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.timeTables.map(
                                timeTable =>
                                    <tr key={timeTable.id}>
                                        <td>{timeTable.ordinal}</td>
                                        <td>{timeTable.dept.name}</td>
                                        <td>{timeTable.dayOfWeek}</td>
                                        <td>{timeTable.subject.name}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateTimeTableClicked(timeTable.id)}>Update
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTimeTableClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default TimeTableList