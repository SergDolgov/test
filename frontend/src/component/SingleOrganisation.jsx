import React, {Component} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import OrganisationService from "../service/OrganisationService";

class SingleOrganisation extends Component {

    constructor(props) {
        super(props);
        console.log('single');
        this.state = {
            id: this.props.match.params.id,
            name: '',
            code: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    render() {
        let {name, code} = this.state;

        return (
            <div>
                <div className="flex">
                    <h3>Organisation</h3>
                    <button className="btn btn-warning" onClick={() => this.goToRecipe()}>Recipe</button>
                </div>
                <div className="container">
                    <Formik
                        initialValues={{name, code}}
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
                                    <ErrorMessage name="code" component="div"
                                                  className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Name</label>
                                        <Field className="form-control" type="text" name="name"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Code</label>
                                        <Field className="form-control" type="text" name="code"/>
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
        console.log('in singleProd' + this.state.id);

        if (this.state.id == -1) {
            console.log("id - 1?");
            return
        }

        OrganisationService.getOrganisationById(this.state.id)
            .then(response => {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        code: response.data.code
                    })
                }
            )
    }

    onSubmit(values) {
        let organisationDTO = {
            name: values.name,
            code: values.code
        };
        console.log(organisationDTO);

        if (this.state.id == -1) {
            OrganisationService.createOrganisation(organisationDTO)
                .then(() => this.props.history.push('/organisations'));
            console.log('inside if => POST')
        } else {
            OrganisationService.updateOrganisation(this.state.id, organisationDTO)
                .then(() => this.props.history.push('/organisations'));
            console.log('inside else => PUT');
        }
    }

    validate(values) {
        let errors = {};
        if (!values.name) {
            errors.name = 'Enter Organisation name'
        }
        if (!values.code) {
            errors.code = 'Enter code of Organisation'
        }
        return errors
    }

    goToRecipe() {
        console.log("in single prop got to recipe ", this.state.id);
        this.props.history.push(`/organisations/${this.state.id}/components`);
    }

}

export default SingleOrganisation