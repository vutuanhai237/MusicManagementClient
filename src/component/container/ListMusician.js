import React, { useEffect, useRef, useState, useReducer } from "react";
import { Col, Row, Table, Button, Modal, Form } from "react-bootstrap";
import {
    MUSICIAN_PAGE_TITLE,
    MUSICIAN_PAGE_TABLE_MUSICIAN_NAME,
    MUSICIAN_PAGE_TABLE_MUSICIAN_SEX,
    MUSICIAN_PAGE_TABLE_MUSICIAN_BIRTHDAY,
    MUSICIAN_PAGE_TABLE_MUSICIAN_QUANTITIES,
    MUSICIAN_PAGE_MODAL_MUSICIAN_NAME,
    MUSICIAN_PAGE_MODAL_MUSICIAN_SEX,
    MUSICIAN_PAGE_MODAL_MUSICIAN_BIRTHDAY,
    MUSICIAN_PAGE_MODAL_TITLE_ADD_MUSICIAN,
    MUSICIAN_PAGE_MODAL_TITLE_MODIFY_MUSICIAN,
    MUSICIAN_PAGE_MODAL_BUTTON_ADD,
    MUSICIAN_PAGE_MODAL_BUTTON_MODIFY,
    MUSICIAN_PAGE_MODAL_BUTTON_CLOSE
} from "../../constant/MusicianPageConstant";
import { SEXS } from "../../constant/index"
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai'
import "react-datepicker/dist/react-datepicker.css";
import "./ListMusician.scss";
import ReactDatePicker from "react-datepicker";
import { setMusiciansService, setMusicianQuantitiesService, addMusicianService, modifyMusicianService, deleteMusicianService } from '../../service/MusicianService'
import { MusicianReducer, initialMusicianState } from '../../reducer/MusicianReducer'
import { setMusiciansAction, setMusicianQuantitiesAction, addMusicianAction, modifyMusicianAction, deleteMusicianAction } from '../../action/MusicianAction'
export const ListMusician = (props) => {
    // reducer
    const [musicianState, musicianDispatch] = useReducer(MusicianReducer, initialMusicianState)
    // state
    const [isShowModal, setIsShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("Add Musician")

    const [currentMusician, setCurrentMusician] = useState("")
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
            setMusicianQuantitiesService().then(result => {
                console.log(result.data)
                var musicianQuantities = []
                result.data.map(e => {
                    return musicianQuantities.push({
                        musician: e[0],
                        quantities: e[1]
                    })
                })
                setMusiciansService().then(result => {
                    var musicians = result.data
                    for (var i = 0; i < musicians.length; i++) {
                        var isInMusicQuantity = false
                        for (var j = 0; j < musicianQuantities.length; j++) {
                            if (musicians[i].id === musicianQuantities[j].musician.id) {
                                isInMusicQuantity = true
                            }
                        }
                        if (isInMusicQuantity === false) {
                            musicianQuantities.push({
                                musician: musicians[i],
                                quantities: 0
                            })
                        }
                    }
                    musicianDispatch(setMusiciansAction(musicians))
                    musicianDispatch(setMusicianQuantitiesAction(musicianQuantities))
                })
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    const getJSONMusician = () => {
        const Musician = {
            "name": currentName,
            "sex": currentSex,
            "birthday": currentBirthday.getFullYear() + "-" + (currentBirthday.getMonth() + 1) + "-" + currentBirthday.getDate(),
        }
        return JSON.stringify(Musician);
    }

    const deleteMusician = (quantities, id) => {
        if (quantities > 0) {
            alert("Please delete the songs has this musician first!")
            return
        } else {
            deleteMusicianService(id)
        }

    }

    const preProcessAddMusician = () => {
        setModalTitle(MUSICIAN_PAGE_MODAL_TITLE_ADD_MUSICIAN)
        handleShow()
        setCurrentName("")
        setCurrentBirthday(new Date())
        setCurrentSex(SEXS[0])
    }

    const preProcessModifyMusician = (musician) => {
        setModalTitle(MUSICIAN_PAGE_MODAL_TITLE_MODIFY_MUSICIAN)
        handleShow()
        var date = new Date()
        date.setMonth(parseInt(musician.birthday.substr(5, 2)) - 1)
        date.setFullYear(musician.birthday.substr(0, 4))
        date.setDate(musician.birthday.substr(8, 2))
        setCurrentID(musician.id)
        setCurrentName(musician.name)
        setCurrentSex(musician.sex)
        setCurrentBirthday(date)
    }

    const addMusician = () => {
        // name, sex, birthday
        if (currentName !== "") {
            handleClose()
            const JSONMusician = getJSONMusician()
            addMusicianService(JSONMusician)
        } else {
            alert("Please enter musician name!")
        }
    }

    const modifyMusician = () => {

        if (currentName !== "") {
            handleClose()
            const JSONMusician = getJSONMusician();
            modifyMusicianService(currentID, JSONMusician)
        } else {
            alert("Please enter musician name!")
        }
    }

    return (
        <div id="listMusician">
            <Modal show={isShowModal} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="nameArea">
                        <Form.Label>{MUSICIAN_PAGE_MODAL_MUSICIAN_NAME}</Form.Label>
                        <Form.Control value={currentName} onChange={e => setCurrentName(e.target.value)} type="text" placeholder="Enter name" />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{MUSICIAN_PAGE_MODAL_MUSICIAN_BIRTHDAY}</Form.Label>
                        <br></br>
                        <ReactDatePicker selected={currentBirthday}
                            onChange={setCurrentBirthday} ref={datepickerRef} id="datePicker" />
                    </Form.Group>
                    <Form.Group controlId="sexArea">
                        <Form.Label>{MUSICIAN_PAGE_MODAL_MUSICIAN_SEX}</Form.Label>
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
                        {MUSICIAN_PAGE_MODAL_BUTTON_CLOSE}
                    </Button>
                    <Button variant="success" onClick={modalTitle === MUSICIAN_PAGE_MODAL_TITLE_ADD_MUSICIAN ? addMusician : modifyMusician}>
                        {modalTitle === MUSICIAN_PAGE_MODAL_TITLE_ADD_MUSICIAN ? MUSICIAN_PAGE_MODAL_BUTTON_ADD : MUSICIAN_PAGE_MODAL_BUTTON_MODIFY}
                    </Button>

                </Modal.Footer>
            </Modal>



            <Col>
                <Row>
                    <p id="pageTitle">{MUSICIAN_PAGE_TITLE}</p>
                </Row>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>{MUSICIAN_PAGE_TABLE_MUSICIAN_NAME}</th>
                                <th>{MUSICIAN_PAGE_TABLE_MUSICIAN_SEX}</th>
                                <th>{MUSICIAN_PAGE_TABLE_MUSICIAN_BIRTHDAY}</th>
                                <th>{MUSICIAN_PAGE_TABLE_MUSICIAN_QUANTITIES}</th>
                                <th><Button variant="success" onClick={preProcessAddMusician}>
                                    <AiOutlineFileAdd />
                                </Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                musicianState.musicianQuantities.map(e => {
                                    return <tr key={e.musician.id}>
                                        <td>{e.musician.name}</td>
                                        <td>{e.musician.sex}</td>
                                        <td>{e.musician.birthday}</td>
                                        <td>{e.quantities}</td>
                                        <td>
                                            <Button className="modifyButton" onClick={() => preProcessModifyMusician(e.musician)} variant="warning">
                                                <AiOutlineEdit />
                                            </Button>
                                            <Button className="deleteButton" onClick={() => deleteMusician(e.quantities, e.musician.id)} variant="danger">
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

