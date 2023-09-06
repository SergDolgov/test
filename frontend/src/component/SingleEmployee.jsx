import React, {Component} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import EmployeeService from "../service/EmployeeService";

class SingleEmployee extends Component {

    constructor(props) {
        super(props);
        console.log('single singleEmployee');
        this.state = {
            id: this.props.match.params.id,
            name: '',
            code: '',
            email: '',
            organisationId: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    render() {
        let {name, code, email, organisationId} = this.state;

        return (
            <div>
                <div className="container">
                    <Formik
                        initialValues={{name, code, email, organisationId}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="name" component="div"
                                                  className="alert alert-warning"/>
                                    <ErrorMessage name="organisationId" component="div"
                                                  className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Code</label>
                                        <Field className="form-control" type="text" name="code"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field className="form-control" type="text" name="email"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Organisation</label>
                                        <Field className="form-control" type="text" name="organisationId"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }

    componentDidMount() {
        console.log('in singleEmployee id=' + this.state.id);

        if (this.state.id == -1) {
            console.log("id - 1?");
            return
        }

        EmployeeService.getEmployeeById(this.state.id)
            .then(response => {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        code: response.data.code,
                        email: response.data.email,
                        organisationId: response.data.organisation.id
                    })
                }
            )
    }

    onSubmit(values) {
        let employeeDTO = {
            name: values.name,
            code: values.code,
            email: values.email,
            organisationId: values.organisationId
        };
        console.log(employeeDTO);

        if (this.state.id == -1) {
            EmployeeService.createEmployee(employeeDTO)
                .then(() => this.props.history.push('/employees'));
            console.log('inside if => POST')
        } else {
            EmployeeService.updateEmployee(this.state.id, employeeDTO)
                .then(() => this.props.history.push('/employees'));
            console.log('inside else => PUT');
        }
    }

    validate(values) {
        let errors = {};
        if (!values.name) {
            errors.name = 'Enter Employee name'
        }
        if (!values.organisationId) {
            errors.organisationId = 'Enter organisationId of Employee'
        }
        return errors
    }

}

export default SingleEmployee