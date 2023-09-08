import React, {Component} from 'react';
import SubjectService from "../service/SubjectService";

class SubjectList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subjects: []
        };
        this.refreshSubjects = this.refreshSubjects.bind(this);
        this.updateSubjectClicked = this.updateSubjectClicked.bind(this);
        this.addSubjectClicked = this.addSubjectClicked.bind(this);
    }

    componentDidMount() {
        this.refreshSubjects();
    }

    refreshSubjects() {
        SubjectService.getAllSubjects().then(
            response => {
                console.log(response.data);
                this.setState({subjects: response.data});
            }
        )
    }

    updateSubjectClicked(id) {
        console.log("update subject id = ", id);
        this.props.history.push('/subjects/' + id);
    }

    addSubjectClicked() {
        console.log('add clicked');
        this.props.history.push('/subjects/-1')
    }

    render() {
        return (
            <div className="container">
                <h3>All Subjects</h3>
                <div className="container">
                    <table className="table" style={{width: '90%'}}>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Comment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.subjects.map(
                                subject =>
                                    <tr key={subject.id}>
                                        <td>{subject.name}</td>
                                        <td>{subject.comment}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateSubjectClicked(subject.id)}>Update
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addSubjectClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SubjectList