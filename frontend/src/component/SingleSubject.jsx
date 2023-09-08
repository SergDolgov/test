import React, {Component} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import SubjectService from "../service/SubjectService";

class SingleSubject extends Component {

    constructor(props) {
        super(props);
        console.log('single singleSubject');
        this.state = {
            id: this.props.match.params.id,
            name: '',
            comment: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    render() {
        let {name, comment} = this.state;

        return (
            <div>
                <div className="container">
                    <Formik
                        initialValues={{name, comment}}
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
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Comment</label>
                                        <Field className="form-control" type="text" name="comment"/>
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
        console.log('in singleSubject id=' + this.state.id);

        if (this.state.id == -1) {
            console.log("id - 1?");
            return
        }

        SubjectService.getSubjectById(this.state.id)
            .then(response => {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        comment: response.data.comment
                    })
                }
            )
    }

    onSubmit(values) {
        let subjectDTO = {
            name: values.name,
            comment: values.comment
        };
        console.log(subjectDTO);

        if (this.state.id == -1) {
            SubjectService.createSubject(subjectDTO)
                .then(() => this.props.history.push('/subjects'));
            console.log('inside if => POST')
        } else {
            SubjectService.updateSubject(this.state.id, subjectDTO)
                .then(() => this.props.history.push('/subjects'));
            console.log('inside else => PUT');
        }
    }

    validate(values) {
        let errors = {};
        if (!values.name) {
            errors.name = 'Enter Subject name'
        }
        return errors
    }

}

export default SingleSubject