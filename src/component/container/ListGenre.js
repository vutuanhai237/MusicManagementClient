import React, { useEffect, useState, useReducer } from "react";
import { Col, Row, Table, Button, Modal, Form } from "react-bootstrap";
import { 
    GENRE_PAGE_TITLE,
    GENRE_PAGE_TABLE_GENRE_NAME,
    GENRE_PAGE_MODAL_TITLE_ADD_GENRE,
    GENRE_PAGE_MODAL_BUTTON_ADD,
    GENRE_PAGE_MODAL_TITLE_MODIFY_GENRE,
    GENRE_PAGE_MODAL_BUTTON_CLOSE,
    GENRE_PAGE_MODAL_BUTTON_MODIFY,
    GENRE_PAGE_MODAL_GENRE_NAME
} from "../../constant/GenrePageConstant";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai'
import "react-datepicker/dist/react-datepicker.css";
import "./ListGenre.scss";
import { setGenresService, addGenreService, modifyGenreService, deleteGenreService } from '../../service/GenreService'
import { GenreReducer, initialGenreState } from '../../reducer/GenreReducer'
import { setGenresAction, addGenreAction, modifyGenreAction, deleteGenreAction } from '../../action/GenreAction'
export const ListGenre = (props) => {
    // reducer
    const [genreState, genreDispatch] = useReducer(GenreReducer, initialGenreState)
    // state
    const [isShowModal, setIsShowModal] = useState(false)
    const [modalTitle, setModalTitle] = useState("Add Genre")
    const [currentName, setCurrentName] = useState("")
    const [currentGenre, setCurrentGenre] = useState("")
    const [currentID, setCurrentID] = useState(0)
    // ref
    const handleClose = () => setIsShowModal(false)
    const handleShow = () => setIsShowModal(true)
    // properties
    useEffect(() => {
        setGenresService().then(result => {
            genreDispatch(setGenresAction(result.data))
            setCurrentGenre(result.data[0].name)
        })

    }, [])

    const getJSONGenre = () => {
        const genre = {
            "name": currentName,
        }
        return JSON.stringify(genre);
    }

    const deleteGenre = (id) => {
        deleteGenreService(id)
        window.location.reload();
    }

    const preProcessAddGenre = () => {
        setModalTitle(GENRE_PAGE_MODAL_TITLE_ADD_GENRE)
        handleShow()
        setCurrentName("")
        setCurrentGenre(genreState.genres[0].name)
    }

    const preProcessModifyGenre = () => {
        setModalTitle(GENRE_PAGE_MODAL_TITLE_MODIFY_GENRE)
    }

    const addGenre = () => {
        // name, releaseTime, genreID, GenreianID, singerID
        
        if (currentName !== "") {
            handleClose()
            const JSONGenre = getJSONGenre()
            addGenreService(JSONGenre)
            window.location.reload()
        } else {
            alert("Please enter song name!")
        }
    }

    const modifyGenre = (id, Genre) => {
        if (currentName !== "") {
            handleClose()
            const JSONGenre = getJSONGenre();
            modifyGenreService(currentID, JSONGenre)
            window.location.reload();
        } else {
            alert("Please enter song name!")
        }
    }

    return (
        <div id="listGenre">
            <Modal show={isShowModal} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="nameArea">
                        <Form.Label>{GENRE_PAGE_MODAL_GENRE_NAME}</Form.Label>
                        <Form.Control value={currentName} onChange={e => setCurrentName(e.target.value)} type="text" placeholder="Enter name" />

                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        {GENRE_PAGE_MODAL_BUTTON_CLOSE}
                    </Button>
                    <Button variant="success" onClick={modalTitle === GENRE_PAGE_MODAL_TITLE_ADD_GENRE ? addGenre : modifyGenre}>
                        {modalTitle === GENRE_PAGE_MODAL_TITLE_ADD_GENRE ? GENRE_PAGE_MODAL_BUTTON_ADD : GENRE_PAGE_MODAL_BUTTON_MODIFY}
                    </Button>

                </Modal.Footer>
            </Modal>



            <Col>
                <Row>
                    <p id="pageTitle">{GENRE_PAGE_TITLE}</p>
                </Row>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>{GENRE_PAGE_TABLE_GENRE_NAME}</th>
                                <th><Button variant="success" onClick={preProcessAddGenre}>
                                    <AiOutlineFileAdd />
                                </Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                genreState.Genres.map(e => {
                                    return <tr key={e.id}>
                                        <td>{e.name}</td>
                                        <td>
                                            <Button className="modifyButton" onClick={() => preProcessModifyGenre(e)} variant="warning">
                                                <AiOutlineEdit />
                                            </Button>
                                            <Button className="deleteButton" onClick={() => deleteGenre(e.id)} variant="danger">
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

