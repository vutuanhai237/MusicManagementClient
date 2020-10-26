import React, { useEffect, useState, useRef, useReducer } from "react";
import { Col, Row, Table, Button, Modal, Form, Dropdown } from "react-bootstrap";
import { 
    HOME_PAGE_TITLE,
    HOME_PAGE_TABLE_MUSIC_NAME,
    HOME_PAGE_TABLE_RELEASE_TIME,
    HOME_PAGE_TABLE_GENRE,
    HOME_PAGE_TABLE_MUSICIAN,
    HOME_PAGE_TABLE_SINGER,
    HOME_PAGE_MODAL_MUSIC_NAME,
    HOME_PAGE_MODAL_RELEASE_TIME,
    HOME_PAGE_MODAL_GENRE,
    HOME_PAGE_MODAL_MUSICIAN,
    HOME_PAGE_MODAL_SINGER,
    HOME_PAGE_MODAL_TITLE_ADD_MUSIC,
    HOME_PAGE_MODAL_TITLE_MODIFY_MUSIC,
    HOME_PAGE_MODAL_BUTTON_ADD,
    HOME_PAGE_MODAL_BUTTON_MODIFY,
    HOME_PAGE_MODAL_BUTTON_CLOSE,
} from "../../constant/HomePageConstant";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ListMusic.scss";
import { CustomToggle, CustomMenu } from '../MusicManagement/DropDown'
import { setMusicsService, deleteMusicService, modifyMusicService, addMusicService } from '../../service/MusicService'
import { MusicReducer, initialMusicState } from '../../reducer/MusicReducer'
import { setMusicsAction } from '../../action/MusicAction'

import { setSingersService } from '../../service/SingerService'
import { SingerReducer, initialSingerState } from '../../reducer/SingerReducer'
import { setSingersAction } from '../../action/SingerAction'

import { setGenresService } from '../../service/GenreService'
import { GenreReducer, initialGenreState } from '../../reducer/GenreReducer'
import { setGenresAction } from '../../action/GenreAction'

import { setMusiciansService } from '../../service/MusicianService'
import { MusicianReducer, initialMusicianState } from '../../reducer/MusicianReducer'
import { setMusiciansAction } from '../../action/MusicianAction'

export const ListMusic = (props) => {
    // reducer
    const [singerState, singerDispatch] = useReducer(SingerReducer, initialSingerState);
    const [genreState, genreDispatch] = useReducer(GenreReducer, initialGenreState);
    const [musicState, musicDispatch] = useReducer(MusicReducer, initialMusicState);
    const [musicianState, musicianDispatch] = useReducer(MusicianReducer, initialMusicianState);
    // state
    const [isShowModal, setIsShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add music");
    const [currentID, setCurrentID] = useState(0);
    const [releaseTime, setReleaseTime] = useState(new Date());
    const [currentName, setCurrentName] = useState("");
    const [currentGenre, setCurrentGenre] = useState("");
    const [currentSinger, setCurrentSinger] = useState("");
    const [currentMusician, setCurrentMusician] = useState("");
    // ref
    const datepickerRef = useRef(null);
    const handleClose = () => setIsShowModal(false);
    const handleShow = () => setIsShowModal(true);
    // properties
    useEffect(() => {
        setMusicsService().then(result => {
            musicDispatch(setMusicsAction(result.data))
        })
        setSingersService().then(result => {
            singerDispatch(setSingersAction(result.data))
            setCurrentSinger(result.data[0].name)
        })

        setGenresService().then(result => {
            genreDispatch(setGenresAction(result.data))
            setCurrentGenre(result.data[0].name)
        })

        setMusiciansService().then(result => {
            musicianDispatch(setMusiciansAction(result.data))
            setCurrentMusician(result.data[0].name)
        })



    }, [])

    const getJSONMusic = () => {
        const music = {
            "name": currentName,
            "releaseTime": releaseTime.getFullYear() + "-" + (releaseTime.getMonth() + 1) + "-" + releaseTime.getDate(),
            "genre": (genreState.genres.filter(i => i.name === currentGenre))[0],
            "singer": (singerState.singers.filter(i => i.name === currentSinger))[0],
            "musician": (musicianState.musicians.filter(i => i.name === currentMusician))[0]
        }
        return JSON.stringify(music);
    }
    const deleteMusic = (id) => {
        deleteMusicService(id)
        window.location.reload();
    }

    const preProcessAddMusic = () => {
        setModalTitle(HOME_PAGE_MODAL_TITLE_ADD_MUSIC)
        handleShow()
        setCurrentName("")
        setReleaseTime(new Date())
        setCurrentGenre(genreState.genres[0].name)
        setCurrentSinger(singerState.singers[0].name)
        setCurrentMusician(musicianState.musicians[0].name)
    }

    const preProcessModifyMusic = (music) => {

        setModalTitle(HOME_PAGE_MODAL_TITLE_MODIFY_MUSIC)
        handleShow()
        var date = new Date()
        date.setMonth(parseInt(music.releaseTime.substr(5, 2)) - 1)
        date.setFullYear(music.releaseTime.substr(0, 4))
        date.setDate(music.releaseTime.substr(8, 2))
        setCurrentID(music.id)
        setCurrentName(music.name)
        setReleaseTime(date)
        setCurrentGenre(music.genre.name)
        setCurrentSinger(music.singer.name)
        setCurrentMusician(music.musician.name)

    }

    const addMusic = () => {
        // name, releaseTime, genreID, musicianID, singerID
        
        if (currentName !== "") {
            handleClose()
            const JSONMusic = getJSONMusic()
            addMusicService(JSONMusic)
            window.location.reload()
        } else {
            alert("Please enter song name!")
        }
    }

    const modifyMusic = (id, music) => {
        if (currentName !== "") {
            handleClose()
            const JSONMusic = getJSONMusic();
            modifyMusicService(currentID, JSONMusic)
            window.location.reload();
        } else {
            alert("Please enter song name!")
        }
    }

    return (
        <div id="listMusic">
            <Modal show={isShowModal} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="nameArea">
                        <Form.Label>{HOME_PAGE_MODAL_MUSIC_NAME}</Form.Label>
                        <Form.Control value={currentName} onChange={e => setCurrentName(e.target.value)} type="text" placeholder="Enter name" />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{HOME_PAGE_MODAL_RELEASE_TIME}</Form.Label>
                        <br></br>
                        <ReactDatePicker selected={releaseTime}
                            onChange={setReleaseTime} ref={datepickerRef} id="datePicker" />
                    </Form.Group>
                    <Form.Group controlId="genreArea">
                        <Form.Label>{HOME_PAGE_MODAL_GENRE}</Form.Label>
                        <Form.Control value={currentGenre} onChange={e => setCurrentGenre(e.target.value)} as="select">
                            {
                                genreState.genres.map(e => {
                                    return <option key={e.id}> {e.name} </option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="musicianArea">
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                <p id="selectP">{HOME_PAGE_MODAL_MUSICIAN + currentMusician}</p>
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    musicianState.musicians.map(e => {
                                        return <Dropdown.Item onClick={() => { setCurrentMusician(e.name) }} eventKey={e.name}>{e.name}</Dropdown.Item>
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Group controlId="singerArea">
                        <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                <p id="selectP">{HOME_PAGE_MODAL_SINGER + currentSinger}</p>
                            </Dropdown.Toggle>

                            <Dropdown.Menu as={CustomMenu}>
                                {
                                    singerState.singers.map(e => {
                                        return <Dropdown.Item onClick={() => { setCurrentSinger(e.name) }} eventKey={e.name}>{e.name}</Dropdown.Item>
                                    })
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        {HOME_PAGE_MODAL_BUTTON_CLOSE}
                    </Button>
                    <Button variant="success" onClick={modalTitle === HOME_PAGE_MODAL_TITLE_ADD_MUSIC ? addMusic : modifyMusic}>
                        {modalTitle === HOME_PAGE_MODAL_TITLE_ADD_MUSIC ? HOME_PAGE_MODAL_BUTTON_ADD : HOME_PAGE_MODAL_BUTTON_MODIFY}
                    </Button>

                </Modal.Footer>
            </Modal>



            <Col>
                <Row>
                    <p id="pageTitle">{HOME_PAGE_TITLE}</p>
                </Row>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>{HOME_PAGE_TABLE_MUSIC_NAME}</th>
                                <th>{HOME_PAGE_TABLE_RELEASE_TIME}</th>
                                <th>{HOME_PAGE_TABLE_GENRE}</th>
                                <th>{HOME_PAGE_TABLE_MUSICIAN}</th>
                                <th>{HOME_PAGE_TABLE_SINGER}</th>
                                <th><Button variant="success" onClick={preProcessAddMusic}>
                                    <AiOutlineFileAdd />
                                </Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                musicState.musics.map(e => {
                                    return <tr key={e.id}>
                                        <td>{e.name}</td>
                                        <td>{e.releaseTime}</td>
                                        <td>{e.genre.name}</td>
                                        <td>{e.musician.name}</td>
                                        <td>{e.singer.name}</td>
                                        <td>
                                            <Button className="modifyButton" onClick={() => preProcessModifyMusic(e)} variant="warning">
                                                <AiOutlineEdit />
                                            </Button>
                                            <Button className="deleteButton" onClick={() => deleteMusic(e.id)} variant="danger">
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

