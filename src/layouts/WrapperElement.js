import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../components/Sidebar/index'
// import Footer from '../components/Footer/Footer'
// import Header from '../components/Header/Header'



class WrapperElement extends Component {
    render() {
        return (
        <div className="wrapper">
            <Sidebar />
            <div id="main-panel" className="main-panel" ref="mainPanel">
                {/*<Header />*/}
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
                {/*<Footer />*/}
            </div>
        </div>

        )
    }
}

export default connect(
    (state, ownProps) => ({
        ownProps
    }),
    dispatch => ({
    })
)(WrapperElement);