import React, { Component } from 'react';

class NotMatch extends Component {

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="clearfix">
                            <h1 className="float-left display-3 mr-2">404</h1>
                            <h4 className="pt-1">Oops! You're lost.</h4>
                            <p className="text-muted">The page you are looking for was not found.</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotMatch;