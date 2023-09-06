import React, {Component} from 'react';
import MessageService from "../service/MessageService";

class MessageList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
        this.refreshMessages = this.refreshMessages.bind(this);
        this.updateMessageClicked = this.updateMessageClicked.bind(this);
        this.addMessageClicked = this.addMessageClicked.bind(this);
    }

    componentDidMount() {
        this.refreshMessages();
    }

    refreshMessages() {
        MessageService.getAllMessages().then(
            response => {
                console.log(response.data);
                this.setState({messages: response.data});
            }
        )
    }

    updateMessageClicked(id) {
        console.log("update message id = ", id);
        this.props.history.push('/messages/' + id);
    }

    addMessageClicked() {
        console.log('add clicked');
        this.props.history.push('/messages/-1')
    }

    render() {
        return (
            <div className="container">
                <h3>All Messages</h3>
                <div className="container">
                    <table className="table" style={{width: '90%'}}>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>text</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.messages.map(
                                message =>
                                    <tr key={message.id}>
                                        <td>{message.id}</td>
                                        <td>{message.text}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateMessageClicked(message.id)}>Update
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addMessageClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default MessageList