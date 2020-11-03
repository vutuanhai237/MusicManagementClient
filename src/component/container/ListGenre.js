import React, { useEffect, useState, useReducer } from "react";
import { Col, Row, Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import {
    GENRE_PAGE_TITLE,
    GENRE_PAGE_TABLE_GENRE_NAME,
    GENRE_PAGE_MODAL_TITLE_ADD_GENRE,
    GENRE_PAGE_MODAL_BUTTON_ADD,
    GENRE_PAGE_MODAL_TITLE_MODIFY_GENRE,
    GENRE_PAGE_MODAL_BUTTON_CLOSE,
    GENRE_PAGE_MODAL_BUTTON_MODIFY,
    GENRE_PAGE_MODAL_GENRE_NAME,
    GENRE_PAGE_TABLE_GENRE_QUANTITY
} from "../../constant/GenrePageConstant";
import { getObjectByPagination } from "../../utils/Helper"
import {
    ITEM_PER_PAGE,
    MODAL_CONFIRM_TITLE,
    MODAL_CONFIRM_BODY,
    MODAL_BUTTON_NO,
    MODAL_BUTTON_YES
} from "../../constant/index"
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai'
import "react-datepicker/dist/react-datepicker.css";
import "./ListGenre.scss";
import { setGenresService, setGenreQuantitiesService, addGenreService, modifyGenreService, deleteGenreService } from '../../service/GenreService'
import { GenreReducer, initialGenreState } from '../../reducer/GenreReducer'
import { setGenresAction, setGenreQuantitiesAction, addGenreAction, modifyGenreAction, deleteGenreAction } from '../../action/GenreAction'
export const ListGenre = (props) => {
    // reducer
    const [genreState, genreDispatch] = useReducer(GenreReducer, initialGenreState)
    // state
    const [isShowModal, setIsShowModal] = useState(false)
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [modalTitle, setModalTitle] = useState(GENRE_PAGE_MODAL_TITLE_ADD_GENRE)
    const [currentName, setCurrentName] = useState("")
    const [currentGenre, setCurrentGenre] = useState("")
    const [currentQuantity, setCurrentQuantity] = useState(0)
    const [currentID, setCurrentID] = useState(0)
    const [pagination, setPagination] = useState([])
    const [currentPagination, setCurrentPagination] = useState(1)
    // ref
    const handleClose = () => setIsShowModal(false)
    const handleShow = () => setIsShowModal(true)
    const handleCloseModalConfirm = () =>  setIsShowModalConfirm(false);
    const handleShowModalConfirm = () => setIsShowModalConfirm(true);
    // properties
    useEffect(() => {

    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            setGenreQuantitiesService().then(result => {
                var genreQuantities = []
                result.data.map(e => {
                    return genreQuantities.push({
                        genre: e[0],
                        quantities: e[1]
                    })
                })
                setGenresService().then(result => {
                    var genres = result.data
                    for (var i = 0; i < genres.length; i++) {
                        var isInGenreQuantity = false
                        for (var j = 0; j < genreQuantities.length; j++) {
                            if (genres[i].id === genreQuantities[j].genre.id) {
                                isInGenreQuantity = true
                            }
                        }
                        if (isInGenreQuantity === false) {
                            genreQuantities.push({
                                genre: genres[i],
                                quantities: 0
                            })
                        }
                    }
                    // pagin
                    var pagination = []
                    for (let number = 1; number <= genreQuantities.length/ITEM_PER_PAGE + 1; number++) {
                        pagination.push(
                            <Pagination.Item onClick={() => setCurrentPagination(number)} key={number}>
                                {number}
                            </Pagination.Item>,
                        );
                    }
                    setPagination(pagination)
                    genreDispatch(setGenresAction(genres))
                    genreDispatch(setGenreQuantitiesAction(genreQuantities))
                })
            })
        }, 1000);
        return () => clearInterval(interval);


    }, [])

  
    const getJSONGenre = () => {
        const genre = {
            "name": currentName,
        }
        return JSON.stringify(genre);
    }

   

    const preProcessDeleteGenre = (quantity, id) => {
        handleShowModalConfirm()
        setCurrentID(id)
        setCurrentQuantity(quantity)
    }

    const deleteGenre = () => {
        handleCloseModalConfirm()
        if (currentQuantity > 0) {
            alert("Please delete the songs has this genre first!")
            return
        } else {
            deleteGenreService(currentID)   
        }
    }

    const preProcessAddGenre = () => {
        setModalTitle(GENRE_PAGE_MODAL_TITLE_ADD_GENRE)
        handleShow()
        setCurrentName("")
    }

    const preProcessModifyGenre = (genre) => {
        setModalTitle(GENRE_PAGE_MODAL_TITLE_MODIFY_GENRE)
        handleShow()
        setCurrentID(genre.id)
        setCurrentName(genre.name)
    }

    const addGenre = () => {
        // name, releaseTime, genreID, GenreianID, singerID
        for (var i = 0; i < genreState.genreQuantities.length; i++) {
            if (currentName.toUpperCase() === genreState.genreQuantities[i].genre.name.toUpperCase()) {
                alert("Please type different genre name!")
                return
            }
        }
        if (currentName !== "") {
            handleClose()
            const JSONGenre = getJSONGenre()
            addGenreService(JSONGenre)
        } else {
            alert("Please enter genre name!")
        }
    }

    const modifyGenre = () => {
        if (currentName !== "") {
            handleClose()
            const JSONGenre = getJSONGenre();
            modifyGenreService(currentID, JSONGenre)
        } else {
            alert("Please enter genre name!")
        }
    }

    return (
        
        <div id="listGenre">
             <Modal centered show={isShowModalConfirm} onHide={handleCloseModalConfirm} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{MODAL_CONFIRM_TITLE}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {MODAL_CONFIRM_BODY}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleCloseModalConfirm}>
                        {MODAL_BUTTON_NO}
                    </Button>
                    <Button variant="success" onClick={deleteGenre}>
                        {MODAL_BUTTON_YES}
                    </Button>

                </Modal.Footer>
            </Modal>
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
                                <th>{GENRE_PAGE_TABLE_GENRE_QUANTITY}</th>
                                <th><Button variant="success" onClick={preProcessAddGenre}>
                                    <AiOutlineFileAdd />
                                </Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getObjectByPagination(genreState.genreQuantities, currentPagination).map(e => {
                                    return <tr key={e.genre.id}>
                                        <td>{e.genre.name}</td>
                                        <td>{e.quantities}</td>
                                        <td>
                                            <Button className="modifyButton" onClick={() => preProcessModifyGenre(e.genre)} variant="warning">
                                                <AiOutlineEdit />
                                            </Button>
                                            <Button className="deleteButton" onClick={() => preProcessDeleteGenre(e.quantities, e.genre.id)} variant="danger">
                                                <AiOutlineDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>

                    </Table>
                    <Pagination>{pagination}</Pagination>
                </Row>
            </Col>
        </div>
    );
};

