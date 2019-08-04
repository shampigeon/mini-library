import React from "react";
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import Page1 from './layouts/pages/Page1';
import Page2 from './layouts/pages/Page2';
import NotMatch from './layouts/NotMatch';
// import 'react-toastify/dist/ReactToastify.css';
import WrapperElement from './layouts/WrapperElement'

const Routes = () => (
    <div>
        <Switch>
            <RouteWithLayout layout={WrapperElement} exact path="/" component={Page1} />
            <RouteWithLayout layout={WrapperElement} exact path="/second" component={Page2} />
            <Route component={NotMatch} />
        </Switch>
    </div>
);

function RouteWithLayout({layout, component, ...rest}) {
    return (
        <Route {...rest} render={(props) =>
            React.createElement(layout, props, React.createElement(component, props))
        }/>
    );
}

export default withRouter(connect(
    (state, ownProps) => ({
        ownProps,
        accountData: state.accountData,
    })
)(Routes));