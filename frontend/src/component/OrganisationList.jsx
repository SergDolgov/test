import React, {Component} from 'react';
import OrganisationService from "../service/OrganisationService";

class OrganisationList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            organisations: []
        };
        this.refreshOrganisations = this.refreshOrganisations.bind(this);
        this.updateOrganisationClicked = this.updateOrganisationClicked.bind(this);
        this.addOrganisationClicked = this.addOrganisationClicked.bind(this);
    }

    componentDidMount() {
        this.refreshOrganisations();
    }

    refreshOrganisations() {
        OrganisationService.getAllOrganisations().then(
            response => {
                console.log(response.data.content);
                this.setState({organisations: response.data.content});
            }
        )
    }

    updateOrganisationClicked(id) {
        console.log("update organisation id = ", id);
        this.props.history.push('/organisations/' + id);
    }

    addOrganisationClicked() {
        console.log('add clicked');
        this.props.history.push('/organisations/-1')
    }

    render() {
        return (
            <div className="container">
                <h3>All Organisations</h3>
                <div className="container">
                    <table className="table" style={{width: '90%'}}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Code</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.organisations.map(
                                organisation =>
                                    <tr key={organisation.id}>
                                        <td>{organisation.name}</td>
                                        <td>{organisation.code}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateOrganisationClicked(organisation.id)}>Update
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addOrganisationClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrganisationList