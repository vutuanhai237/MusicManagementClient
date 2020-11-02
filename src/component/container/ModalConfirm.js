import { Modal, Button } from 'react-bootstrap'
import React from "react";
import { 
    MODAL_CONFIRM_TITLE, 
    MODAL_CONFIRM_BODY, 
    MODAL_BUTTON_NO, 
    MODAL_BUTTON_YES 
} from '../../constant/index'
import {
    HOME_PAGE_MODAL_TITLE_ADD_MUSIC
} from '../../constant/HomePageConstant'
const ModalConfirm = (props) => {
    return (
        <Modal centered show={props.isShowModalConfirm} onHide={props.handleCloseModalConfirm} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>{MODAL_CONFIRM_TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {MODAL_CONFIRM_BODY}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="danger" onClick={props.handleCloseModalConfirm}>
                {MODAL_BUTTON_NO}
            </Button>
            <Button variant="success" onClick={props.modalTitle === HOME_PAGE_MODAL_TITLE_ADD_MUSIC ? props.addMusic : props.modifyMusic}>
                {MODAL_BUTTON_YES}
            </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default ModalConfirm;