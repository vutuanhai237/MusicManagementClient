import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Row, Col } from 'react-bootstrap';
import "./Footer.scss"
import { FOOTER_QUOTE, FOOTER_YOUTUBE, FOOTER_FACEBOOK, FOOTER_GITHUB, FOOTER_LINKEDIN } from '../../constant/index'
const Footer = () => {
    const redirect = (link) => {
        window.location.href = link;
    }
    return (
        <div id="footer">
            <Row>
                <Col>
                    <div id="footerQuote"> <span> {FOOTER_QUOTE + ' @' + (new Date()).getFullYear()} </span> </div>
                </Col>
                <Col>
                    <FontAwesomeIcon id="footerLogo" icon={faGithub} onClick={() => redirect(FOOTER_GITHUB)} />
                    <FontAwesomeIcon id="footerLogo" icon={faFacebook} onClick={() => redirect(FOOTER_FACEBOOK)} />
                    <FontAwesomeIcon id="footerLogo" icon={faYoutube} onClick={() => redirect(FOOTER_YOUTUBE)} />
                    <FontAwesomeIcon id="footerLogo" icon={faLinkedin} onClick={() => redirect(FOOTER_LINKEDIN)} />
                </Col>
            </Row>
        </div>
    );
}

export default Footer;
