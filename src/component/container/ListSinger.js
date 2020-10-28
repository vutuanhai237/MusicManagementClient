import React, { useEffect, useRef, useState, useReducer } from "react";
import { Col, Row, Table, Button, Modal, Form } from "react-bootstrap";
import {
    SINGER_PAGE_TITLE,
    SINGER_PAGE_TABLE_SINGER_NAME,
    SINGER_PAGE_TABLE_SINGER_SEX,
    SINGER_PAGE_TABLE_SINGER_BIRTHDAY,
    SINGER_PAGE_TABLE_SINGER_QUANTITIES,
    SINGER_PAGE_MODAL_SINGER_NAME,
    SINGER_PAGE_MODAL_SINGER_SEX,
    SINGER_PAGE_MODAL_SINGER_BIRTHDAY,
    SINGER_PAGE_MODAL_TITLE_ADD_SINGER,
    SINGER_PAGE_MODAL_TITLE_MODIFY_SINGER,
    SINGER_PAGE_MODAL_BUTTON_ADD,
    SINGER_PAGE_MODAL_BUTTON_MODIFY,
    SINGER_PAGE_MODAL_BUTTON_CLOSE
} from "../../constant/SingerPageConstant";
import { SEXS } from "../../constant/index"
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai'
import "react-datepicker/dist/react-datepicker.css";
import "./ListSinger.scss";
import ReactDatePicker from "react-datepicker";
import { setSingersService, setSingerQuantitiesService, addSingerService, modifySingerService, deleteSingerService } from '../../service/SingerService'
import { SingerReducer, initialSingerState } from '../../reducer/SingerReducer'
import { setSingersAction, setSingerQuantitiesAction } from '../../action/SingerAction'
export const ListSinger = (props) => {
    // reducer
    const [singerState, singerDispatch] = useReducer(SingerReducer, initialSingerState)
    // state
    const [isShowModal, setIsShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("Add singer")

    const [currentSinger, setCurrentSinger] = useState("")
    const [currentID, setCurrentID] = useState(0);
    const [currentBirthday, setCurrentBirthday] = useState(new Date());
    const [currentName, setCurrentName] = useState("");
    const [currentSex, setCurrentSex] = useState("");
    // ref
    const datepickerRef = useRef(null);
    const handleClose = () => setIsShowModal(false)
    const handleShow = () => setIsShowModal(true)
    // properties
    useEffect(() => {
        const interval = setInterval(() => {
            setSingerQuantitiesService().then(result => {
                var singerQuantities = []
                result.data.map(e => {
                    return singerQuantities.push({
                        singer: e[0],
                        quantities: e[1]
                    })
                })
                setSingersService().then(result => {
                    var singers = result.data
                    for (var i = 0; i < singers.length; i++) {
                        var isInSingerQuantity = false
                        for (var j = 0; j < singerQuantities.length; j++) {
                            if (singers[i].id === singerQuantities[j].singer.id) {
                                isInSingerQuantity = true
                            }
                        }
                        if (isInSingerQuantity === false) {
                            singerQuantities.push({
                                singer: singers[i],
                                quantities: 0
                            })
                        }
                    }
                    singerDispatch(setSingersAction(singers))
                    singerDispatch(setSingerQuantitiesAction(singerQuantities))
                })
            })
          }, 1000);
          return () => clearInterval(interval);
       
    }, [])

    const getJSONSinger = () => {
        const singer = {
            "name": currentName,
            "sex": currentSex,
            "birthday": currentBirthday.getFullYear() + "-" + (currentBirthday.getMonth() + 1) + "-" + currentBirthday.getDate(),
        }
        return JSON.stringify(singer);
    }

    const deleteSinger = (quantities, id) => {
        if (quantities > 0) {
            alert("Please delete the songs has this singer first!")
            return
        } else {
            deleteSingerService(id)
        }

    }

    const preProcessAddSinger = () => {
        setModalTitle(SINGER_PAGE_MODAL_TITLE_ADD_SINGER)
        handleShow()
        setCurrentName("")
        setCurrentBirthday(new Date())
        setCurrentSex(SEXS[0])
    }

    const preProcessModifySinger = (singer) => {
        setModalTitle(SINGER_PAGE_MODAL_TITLE_MODIFY_SINGER)
        handleShow()
        var date = new Date()
        date.setMonth(parseInt(singer.birthday.substr(5, 2)) - 1)
        date.setFullYear(singer.birthday.substr(0, 4))
        date.setDate(singer.birthday.substr(8, 2))
        console.log(singer)
        setCurrentID(singer.id)
        setCurrentName(singer.name)
        setCurrentSex(singer.sex)
        setCurrentBirthday(date)
    }

    const addSinger = () => {
        // name, sex, birthday
        if (currentName !== "") {
            handleClose()
            const JSONsinger = getJSONSinger()
            addSingerService(JSONsinger)
        } else {
            alert("Please enter singer name!")
        }
    }

    const modifySinger = () => {

        if (currentName !== "") {
            handleClose()
            const JSONSinger = getJSONSinger();
            modifySingerService(currentID, JSONSinger)
        } else {
            alert("Please enter singer name!")
        }
    }

    return (
        <div id="listSinger">
            <Modal show={isShowModal} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="nameArea">
                        <Form.Label>{SINGER_PAGE_MODAL_SINGER_NAME}</Form.Label>
                        <Form.Control value={currentName} onChange={e => setCurrentName(e.target.value)} type="text" placeholder="Enter name" />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{SINGER_PAGE_MODAL_SINGER_BIRTHDAY}</Form.Label>
                        <br></br>
                        <ReactDatePicker selected={currentBirthday}
                            onChange={setCurrentBirthday} ref={datepickerRef} id="datePicker" />
                    </Form.Group>
                    <Form.Group controlId="sexArea">
                        <Form.Label>{SINGER_PAGE_MODAL_SINGER_SEX}</Form.Label>
                        <Form.Control value={currentSex} onChange={e => setCurrentSex(e.target.value)} as="select">
                            {
                                SEXS.map(e => {
                                    return <option key={e}> {e} </option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        {SINGER_PAGE_MODAL_BUTTON_CLOSE}
                    </Button>
                    <Button variant="success" onClick={modalTitle === SINGER_PAGE_MODAL_TITLE_ADD_SINGER ? addSinger : modifySinger}>
                        {modalTitle === SINGER_PAGE_MODAL_TITLE_ADD_SINGER ? SINGER_PAGE_MODAL_BUTTON_ADD : SINGER_PAGE_MODAL_BUTTON_MODIFY}
                    </Button>

                </Modal.Footer>
            </Modal>



            <Col>
                <Row>
                    <p id="pageTitle">{SINGER_PAGE_TITLE}</p>
                </Row>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>{SINGER_PAGE_TABLE_SINGER_NAME}</th>
                                <th>{SINGER_PAGE_TABLE_SINGER_SEX}</th>
                                <th>{SINGER_PAGE_TABLE_SINGER_BIRTHDAY}</th>
                                <th>{SINGER_PAGE_TABLE_SINGER_QUANTITIES}</th>
                                <th><Button variant="success" onClick={preProcessAddSinger}>
                                    <AiOutlineFileAdd />
                                </Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                singerState.singerQuantities.map(e => {
                                    return <tr key={e.singer.id}>
                                        <td>{e.singer.name}</td>
                                        <td>{e.singer.sex}</td>
                                        <td>{e.singer.birthday}</td>
                                        <td>{e.quantities}</td>
                                        <td>
                                            <Button className="modifyButton" onClick={() => preProcessModifySinger(e.singer)} variant="warning">
                                                <AiOutlineEdit />
                                            </Button>
                                            <Button className="deleteButton" onClick={() => deleteSinger(e.quantities, e.singer.id)} variant="danger">
                                                <AiOutlineDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table>
                </Row>
            </Col>
        </div>
    );
};

