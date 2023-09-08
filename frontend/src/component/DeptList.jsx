import React, {Component} from 'react';
import DeptService from "../service/DeptService";

class DeptList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            depts: []
        };
        this.refreshDepts = this.refreshDepts.bind(this);
        this.updateDeptClicked = this.updateDeptClicked.bind(this);
        this.addDeptClicked = this.addDeptClicked.bind(this);
    }

    componentDidMount() {
        this.refreshDepts();
    }

    refreshDepts() {
        DeptService.getAllDepts().then(
            response => {
                console.log(response.data.content);
                this.setState({depts: response.data.content});
            }
        )
    }

    updateDeptClicked(id) {
        console.log("update dept id = ", id);
        this.props.history.push('/depts/' + id);
    }

    addDeptClicked() {
        console.log('add clicked');
        this.props.history.push('/depts/-1')
    }

    render() {
        return (
            <div className="container">
                <h3>All Depts</h3>
                <div className="container">
                    <table className="table" style={{width: '90%'}}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Organisation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.depts.map(
                                dept =>
                                    <tr key={dept.id}>
                                        <td>{dept.name}</td>
                                        <td>{dept.code}</td>
                                        <td>{dept.organisation.name}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateDeptClicked(dept.id)}>Update
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addDeptClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeptList