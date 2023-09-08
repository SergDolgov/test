import React, {Component} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import DeptService from "../service/DeptService";

class SingleDept extends Component {

    constructor(props) {
        super(props);
        console.log('single singleDept');
        this.state = {
            id: this.props.match.params.id,
            name: '',
            code: '',
            organisationId: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    render() {
        let {name, code, organisationId} = this.state;

        return (
            <div>
                <div className="container">
                    <Formik
                        initialValues={{name, code, organisationId}}
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
        console.log('in singleDept id=' + this.state.id);

        if (this.state.id == -1) {
            console.log("id - 1?");
            return
        }

        DeptService.getDeptById(this.state.id)
            .then(response => {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        code: response.data.code,
                        organisationId: response.data.organisation.id
                    })
                }
            )
    }

    onSubmit(values) {
        let deptDTO = {
            name: values.name,
            code: values.code,
            organisationId: values.organisationId
        };
        console.log(deptDTO);

        if (this.state.id == -1) {
            DeptService.createDept(deptDTO)
                .then(() => this.props.history.push('/depts'));
            console.log('inside if => POST')
        } else {
            DeptService.updateDept(this.state.id, deptDTO)
                .then(() => this.props.history.push('/depts'));
            console.log('inside else => PUT');
        }
    }

    validate(values) {
        let errors = {};
        if (!values.name) {
            errors.name = 'Enter Dept name'
        }
        if (!values.organisationId) {
            errors.organisationId = 'Enter organisationId of Dept'
        }
        return errors
    }

}

export default SingleDept