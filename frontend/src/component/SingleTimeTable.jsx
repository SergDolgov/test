import React, {Component} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import TimeTableService from "../service/TimeTableService";
import SubjectService from "../service/SubjectService";

class SingleTimeTable extends Component {

    constructor(props) {
        super(props);
        console.log('single TimeTable');
        this.state = {
            id: this.props.match.params.id,
            ordinal: '',
            deptId: '',
            dayOfWeek: '',
            subjects: [],
            subjectId: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        });
    };

    render() {
        //let {ordinal, deptId, dayOfWeek, subjectId} = this.state;
        const { ordinal, deptId, dayOfWeek, subjectId, subjects } = this.state;

        return (
            <div>
                <div className="container">
                    <Formik
                        initialValues={{ordinal, deptId, dayOfWeek, subjectId}}
                        onSubmit={this.onSubmit}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validate={this.validate}
                        enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="dayOfWeek" component="div"
                                                  className="alert alert-warning"/>
                                    <ErrorMessage name="deptId" component="div"
                                                  className="alert alert-warning"/>
                                    <ErrorMessage name="subjectId" component="div"
                                                  className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>N</label>
                                        <Field className="form-control" type="text" name="ordinal"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Dept</label>
                                        <Field className="form-control" type="text" name="deptId"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label htmlFor="dayOfWeek">Day of week:  </label>
                                        <select id="dayOfWeek" value={dayOfWeek} onChange={this.handleChange}>
                                            <option value="0">SUNDAY</option>
                                            <option value="1">MONDAY</option>
                                            <option value="2">TUESDAY</option>
                                            <option value="3">WEDNESDAY</option>
                                            <option value="4">THURSDAY</option>
                                            <option value="5">FRIDAY</option>
                                            <option value="6">SATURDAY</option>
                                        </select>

                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Subject</label>
                                        <Field className="form-control" type="text" name="subjectId"/>
                                    </fieldset>

{/*                                     <fieldset className="form-group"> */}
{/*                                         <label>Subject</label> */}
{/*                                         <Field as="select" className="form-control" name="subjectId"> */}
{/*                                             <option value="">Выберите предмет</option> */}
{/*                                             {subjects.map(subject => ( */}
{/*                                                 <option key={subject.subjectId} value={subject.subjectId}> */}
{/*                                                     {subject.name} */}
{/*                                                 </option> */}
{/*                                             ))} */}
{/*                                         </Field> */}
{/*                                     </fieldset> */}

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

        console.log('in singleTimeTable id=' + this.state.id);

        if (this.state.id == -1) {
            console.log("id - 1?");
            return
        }

        SubjectService.getAllSubjects()
            .then(response => {
                this.setState({
                    subjects: response.data // Установите список предметов в состояние
                });
            })
            .catch(error => {
                console.error("Ошибка при получении списка предметов: ", error);
            });

        TimeTableService.getTimeTableById(this.state.id)
            .then(response => {
                    this.setState({
                        id: response.data.id,
                        ordinal: response.data.ordinal,
                        deptId: response.data.dept.id,
                        //dayOfWeek: response.data.dayOfWeek,
                        dayOfWeek: TimeTableService.getDayOfWeekNumber(response.data.dayOfWeek),
                        subjectId: response.data.subject.id
                    })
                }
            )

    }

    onSubmit(values) {
        let timeTableDTO = {
            ordinal: values.ordinal,
            deptId: values.deptId,
            dayOfWeek: values.dayOfWeek,
            subjectId: values.subjectId
        };
        console.log(timeTableDTO);

        if (this.state.id == -1) {
            TimeTableService.createTimeTable(timeTableDTO)
                .then(() => this.props.history.push('/time_tables'));
            console.log('inside if => POST')
        } else {
            TimeTableService.updateTimeTable(this.state.id, timeTableDTO)
                .then(() => this.props.history.push('/time_tables'));
            console.log('inside else => PUT');
        }
    }

    validate(values) {
        let errors = {};
        if (!values.dayOfWeek) {
            errors.dayOfWeek = 'Enter dayOfWeek'
        }
        if (!values.deptId) {
            errors.deptId = 'Enter deptId of TimeTable'
        }
        if (!values.subjectId) {
            errors.subjectId = 'Enter subjectId of TimeTable'
        }
        return errors
    }

}

export default SingleTimeTable