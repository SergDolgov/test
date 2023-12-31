import React, {Component} from 'react';
import '../App.css';
import {Route, Switch} from 'react-router-dom'
import CompWithOrderAndTables from "./CompWithOrderAndTables";
import Statistics from "./Statistics";
import ComponentList from "./ComponentList";
import NaviBar from "./NaviBar";
import StatisticsComponent from "./statistics/StatisticsComponent";
import StatisticsDesk from "./statistics/StatisticsDesk";
import AdminNavBar from "./AdminNavBar";
import SingleComponent from "./SingleComponent";
import ProductList from "./ProductList";
import SingleProduct from "./SingleProduct";
import ProductComponents from "./ProductComponents";
import SingleInvoice from "./SingleInvoice";
import InvoiceItemsList from "./InvoiceItemsList";

import DeptList from "./DeptList";
import SingleDept from "./SingleDept";
import OrganisationList from "./OrganisationList";
import SingleOrganisation from "./SingleOrganisation";
import EmployeeList from "./EmployeeList";
import SingleEmployee from "./SingleEmployee";
import SubjectList from "./SubjectList";
import SingleSubject from "./SingleSubject";
import TimeTableList from "./TimeTableList";
import SingleTimeTable from "./SingleTimeTable";

class SuperComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFrom: '',
            dateTo: '',
            count: 0
        }
    }

    dateFromStat = (a, b) => {
        this.state.dateFrom = a;
        this.state.dateTo = b;
    };

    render() {
        return (
            <div className="superComponent">
                <div style={{border: "black 1px solid"}}>
                    <Route path="/"
                           render={props => <NaviBar {...props} />}/>
                    <Route path="/"
                           render={props => <AdminNavBar {...props}/>}/>
{/*                     <Route path="/" */}
{/*                            render={props => <Statistics dateFr={this.dateFromStat} {...props}/>}/> */}
                </div>
                <div style={{border: "black 1px solid"}}>
                    <Switch>
{/*                         <Route path="/" exact component={CompWithOrderAndTables}/> */}
{/*                         <Route path="/orders/:id" exact component={CompWithOrderAndTables}/>}/> */}
{/*                         <Route path="/components" exact component={ComponentList}/> */}
{/*                         <Route path="/component-report" exact */}
{/*                                render={props => <StatisticsComponent dateFrom={this.state.dateFrom} */}
{/*                                                                      dateTo={this.state.dateTo} {...props}/>}/> */}
{/*                         <Route path="/desk-report" exact */}
{/*                                render={props => <StatisticsDesk dateFrom={this.state.dateFrom} */}
{/*                                                                 dateTo={this.state.dateTo} {...props}/>}/> */}

                        <Route path="/organisations" exact render={props => <OrganisationList {...props}/>}/>
                        <Route path="/organisations/:id" exact render={props => <SingleOrganisation {...props}/>}/>

                        <Route path="/employees" exact render={props => <EmployeeList {...props}/>}/>
                        <Route path="/employees/:id" exact render={props => <SingleEmployee {...props}/>}/>

                        <Route path="/depts" exact render={props => <DeptList {...props}/>}/>
                        <Route path="/depts/:id" exact render={props => <SingleDept {...props}/>}/>

                        <Route path="/subjects" exact render={props => <SubjectList {...props}/>}/>
                        <Route path="/subjects/:id" exact render={props => <SingleSubject {...props}/>}/>

                        <Route path="/time_tables" exact render={props => <TimeTableList {...props}/>}/>
                        <Route path="/time_tables/:id" exact render={props => <SingleTimeTable {...props}/>}/>

                        <Route path="/products/:id/components" exact render={props => <ProductComponents {...props}/>}/>
                        <Route path="/invoices/:id" exact render={props => <SingleInvoice {...props}/>}/>
                        <Route path="/invoices/:id/invoiceItmes" exact
                               render={props => <InvoiceItemsList {...props}/>}/>
                    </Switch>
                </div>
            </div>
        )
    }
}

export default SuperComponent