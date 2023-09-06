import React, {Component} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import MessageService from "../service/MessageService";

class SingleMessage extends Component {

    constructor(props) {
        super(props);
        console.log('single msg');
        this.state = {
            id: this.props.match.params.id,
            text: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    render() {
        let {text} = this.state;

        return (
            <div>
                <div className="flex">
                    <h3>Message</h3>
                    <button className="btn btn-warning" onClick={() => this.goToRecipe()}>Recipe</button>
                </div>
                <div className="container">
                    <Formik
                        initialValues={{text}}
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
                                        <label>Text</label>
                                        <Field className="form-control" type="text" name="text"/>
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
        console.log('in singleMessage' + this.state.id);

        if (this.state.id == -1) {
            console.log("id - 1?");
            return
        }

        MessageService.getMessageById(this.state.id)
            .then(response => {
                    this.setState({
                        id: response.data.id,
                        text: response.data.text
                    })
                }
            )
    }

    onSubmit(values) {
        let messageDTO = {
            text: values.text
        };
        console.log(messageDTO);

        if (this.state.id == -1) {
            MessageService.createMessage(messageDTO)
                .then(() => this.props.history.push('/messages'));
            console.log('inside if => POST')
        } else {
            MessageService.updateMessage(this.state.id, messageDTO)
                .then(() => this.props.history.push('/messages'));
            console.log('inside else => PUT');
        }
    }

    validate(values) {
        let errors = {};
        if (!values.text) {
            errors.text = 'Enter Message text'
        }
        return errors
    }

    goToRecipe() {
        console.log("in single msg got to recipe ", this.state.id);
        this.props.history.push(`/messages/${this.state.id}/components`);
    }

}

export default SingleMessage