import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import imagine from "../../assets/img/sidebar-3.jpg";
import logo from "../../assets/img/reactlogo.png";

class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="container">
                    <nav>
                        <ul className="footer-menu">
                            <li>
                                <a href="#">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    Blog
                                </a>
                            </li>
                        </ul>
                        <p className="copyright text-center">
                            ©
                            <script>
                                document.write(new Date().getFullYear())
                            </script>2019
                            <a href="http://www.creative-tim.com">Creative Tim</a>, made with love for a better web
                        </p>
                    </nav>
                </div>
            </footer>
        )
    }
}

export default Footer;
