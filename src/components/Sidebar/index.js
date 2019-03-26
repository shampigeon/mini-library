import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import imagine from "../../assets/img/sidebar-6.jpg";

class Sidebar extends Component {

    render() {
        return (
            <div className="sidebar" data-image="../assets/img/sidebar-6.jpg" data-color="black">
                <div className="sidebar-wrapper">
                    <div className="logo">
                        <a href="http://www.creative-tim.com" className="simple-text">
                            Библиотека
                        </a>
                    </div>
                    <ul className="nav">
                        <li>
                            <NavLink to={'/'} className="nav-link" activeClassName="active">
                                <i className="nc-icon nc-chart-pie-35" />
                                <p>Каталог книг</p>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/author'} className="nav-link" activeClassName="active">
                                <i className="nc-icon nc-chart-pie-35" />
                                <p>Список авторов</p>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div className="sidebar-background" style={{backgroundImage: "url(" + imagine + ")"}}></div>
            </div>
        )
    }
}

export default Sidebar;