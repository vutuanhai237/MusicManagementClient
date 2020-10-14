import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators } from 'redux';
import leoIcon from '../../img/leoIcon.ico'
import './Header.scss'
import { HEADER_BRAND, HEADER_HOME, HEADER_GENRE, HEADER_MUSICAN, HEADER_SINGER } from '../../constant/index'
const Header = (props) => {

    return (
        <div id="header">
            <Navbar className="navbar justify-content-between" bg="white" expand="md">
                <Navbar.Brand id='headerBrand' href="/">
                    <img alt="" src={leoIcon} width="30" height="30" className="d-inline-block align-top" />
                    {HEADER_BRAND}
                </Navbar.Brand>
               
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="justify-content-center">
                        {/* Menu */}
                        <Nav.Link className="menu-item" href="/">
                            {HEADER_HOME}
                        </Nav.Link>
                        <Nav.Link className="menu-item" href="/genre">
                            {HEADER_GENRE}
                        </Nav.Link>
                        <Nav.Link className="menu-item" href="/musican">
                            {HEADER_MUSICAN}
                        </Nav.Link>
                        <Nav.Link className="menu-item" href="/singer">
                            {HEADER_SINGER}
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <hr></hr>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => bindActionCreators({

}, dispatch);

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Header)
);

