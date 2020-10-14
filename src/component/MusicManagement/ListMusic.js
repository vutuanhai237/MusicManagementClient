import React, { useState } from 'react';
import { Col, Row, Button, Form } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from 'redux';
import "./ExcuteModel.scss"
// import { SetSelectedModelAPI } from '../../service/Braces2TeethService'
import store from '../../store/index';
import { MODEL_CYCLEGAN, MODEL_WGANGP, BRACES2TEETH_SELECTED_MODEL_ACTION } from '../../constant/index'
const ListMusic = (props) => {
    // const [selectedModel, setSelectedModel] = useState("");
    const { uploadedImage } = props;
    const dispatch = useDispatch()
    const changeSelectedModel = (model) => {
        dispatch({
            type: BRACES2TEETH_SELECTED_MODEL_ACTION,
            payload: {
                selectedModel: model
            } 
        })
    }
    return (
        <div id="componentExcuteModel">
            <Col>
                <Row>
                    <Col style={{ paddingLeft: "0px" }}><p> Select model</p></Col>
                    <Col>
                        <Form.Group as={Row}>
                            <fieldset>
                                <Col><Form.Check onChange={() => changeSelectedModel(MODEL_CYCLEGAN)} type="radio" label={MODEL_CYCLEGAN} name="radio" id="radioCycleGAN" /></Col>
                                <Col><Form.Check onChange={() => changeSelectedModel(MODEL_WGANGP)} type="radio" label={MODEL_WGANGP} name="radio" id="radioWGAN-GP" /></Col>
                            </fieldset>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <img alt="" src={uploadedImage} width="256" height="256" className="d-inline-block align-top" />
                </Row>

            </Col>

        </div>
    )
}

const mapStatetoProps = (state) => {
    const { braces2teeth } = state
    return {
        selectedModel: braces2teeth.selectedModel,
        uploadedImage: braces2teeth.uploadedImage,
    };
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    
}, dispatch);

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(ListMusic));
