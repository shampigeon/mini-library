import React from "react";
import { connect } from 'react-redux';
import {
    Switch,
    Route,
    withRouter
} from "react-router-dom";
import Authors from './layouts/Author/Authors';
import Library from './layouts/Library/Library';
import BookEdit from './layouts/Library/BookEdit';
import NotMatch from './layouts/NotMatch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WrapperElement from './layouts/WrapperElement'

const Routes = () => (
    <div>
        <Switch>
            <RouteWithLayout layout={WrapperElement} exact path="/" component={Library} />
            <RouteWithLayout layout={WrapperElement} exact path="/author" component={Authors} />
            <RouteWithLayout layout={WrapperElement} path="/book/:id" component={BookEdit} />
            <Route component={NotMatch} />
        </Switch>
        <ToastContainer />
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