import React, {Component} from 'react';
import EmployeeService from "../service/EmployeeService";

class EmployeeList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
        this.refreshEmployees = this.refreshEmployees.bind(this);
        this.updateEmployeeClicked = this.updateEmployeeClicked.bind(this);
        this.addEmployeeClicked = this.addEmployeeClicked.bind(this);
    }

    componentDidMount() {
        this.refreshEmployees();
    }

    refreshEmployees() {
        EmployeeService.getAllEmployees().then(
            response => {
                console.log(response.data.content);
                this.setState({employees: response.data.content});
            }
        )
    }

    updateEmployeeClicked(id) {
        console.log("update employee id = ", id);
        this.props.history.push('/employees/' + id);
    }

    addEmployeeClicked() {
        console.log('add clicked');
        this.props.history.push('/employees/-1')
    }

    render() {
        return (
            <div className="container">
                <h3>All Employees</h3>
                <div className="container">
                    <table className="table" style={{width: '90%'}}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Email</th>
                            <th>Organisation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.employees.map(
                                employee =>
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>{employee.code}</td>
                                        <td>{employee.email}</td>
                                        <td>{employee.organisation.name}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateEmployeeClicked(employee.id)}>Update
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addEmployeeClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default EmployeeList