import React, { useEffect, useState, useRef, useReducer } from "react";
import { Col, Row, Table, Button, Modal, Form, Dropdown, Pagination } from "react-bootstrap";
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

import { 
    getObjectByPagination, 
    isInArray, 
    getDateFromString 
} from "../../utils/Helper"
import { IconContext } from "react-icons";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import {
    ITEM_PER_PAGE,
    MODAL_CONFIRM_TITLE,
    MODAL_CONFIRM_BODY,
    MODAL_BUTTON_NO,
    MODAL_BUTTON_YES
} from "../../constant/index"
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ListMusic.scss";
import { CustomToggle, CustomMenu } from '../MusicManagement/DropDown'

import { setMusicsService, deleteMusicService, modifyMusicService, addMusicService } from '../../service/MusicService'
import { MusicReducer, initialMusicState } from '../../reducer/MusicReducer'
import { setMusicsAction } from '../../action/MusicAction'

import { getPlaylistByUIDService, deletePlaylistService, addPlaylistService } from '../../service/PlaylistService'
import { getPlaylistByUIDAction } from '../../action/PlaylistAction'

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
    const uid = 1
    // reducer
    const [singerState, singerDispatch] = useReducer(SingerReducer, initialSingerState);
    const [genreState, genreDispatch] = useReducer(GenreReducer, initialGenreState);
    const [musicState, musicDispatch] = useReducer(MusicReducer, initialMusicState);
    const [musicianState, musicianDispatch] = useReducer(MusicianReducer, initialMusicianState);
    // state
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add music");
    const [currentID, setCurrentID] = useState(0);
    const [releaseTime, setReleaseTime] = useState(new Date());
    const [currentName, setCurrentName] = useState("");
    const [currentGenre, setCurrentGenre] = useState("");
    const [currentSinger, setCurrentSinger] = useState("");
    const [currentMusician, setCurrentMusician] = useState("");
    const [pagination, setPagination] = useState([])
    const [currentPagination, setCurrentPagination] = useState(1)

    // ref
    const datepickerRef = useRef(null);
    const handleClose = () => setIsShowModal(false);
    const handleShow = () => setIsShowModal(true);
    const handleCloseModalConfirm = () => setIsShowModalConfirm(false);
    const handleShowModalConfirm = () => setIsShowModalConfirm(true);
    // properties
    useEffect(() => {

        const interval = setInterval(() => {
            setMusicsService().then(musics => {
                getPlaylistByUIDService(uid).then(playlist => {    
                    for (var i = 0; i < musics.data.length; i++) {
                        musics.data[i]["isInPlaylist"] = isInArray(musics.data[i].id, playlist.data)
                    }
                   
                    musicDispatch(setMusicsAction(musics.data))
                    var pagination = []
                    for (let number = 1; number <= musics.data.length / ITEM_PER_PAGE + 1; number++) {
                        pagination.push(
                            <Pagination.Item onClick={() => setCurrentPagination(number)} key={number}>
                                {number}
                            </Pagination.Item>,
                        );
                    }
                    setPagination(pagination)
                })

            })
            setSingersService().then(singers => {
                singerDispatch(setSingersAction(singers.data))

            })

            setGenresService().then(genres => {
                genreDispatch(setGenresAction(genres.data))
            })

            setMusiciansService().then(musicians => {
                musicianDispatch(setMusiciansAction(musicians.data))
            })

        }, 200);
        return () => clearInterval(interval);

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
    const deleteMusic = () => {
        handleCloseModalConfirm()
        deleteMusicService(currentID)
    }

    const preProcessChangePlaylist = (mid, isInPlaylist) => {
        if (isInPlaylist === true) {
            deletePlaylistService(uid, mid)
        } else {
            const playlist = {
                "musicId": mid,
                "userId": uid
            }
            addPlaylistService(JSON.stringify(playlist))
        }
        console.log(mid)
    }
    const preProcessDeleteMusic = (id) => {
        const currentMusic = musicState.musics.filter(item => item.id === id)
        if (currentMusic[0].isInPlaylist === true) {
            alert("Please unlike this song before delete it!")
        } else {
            handleShowModalConfirm()
            setCurrentID(id)
        }
        
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
        } else {
            alert("Please enter song name!")
        }
    }

    const modifyMusic = (id, music) => {
        if (currentName !== "") {
            handleClose()
            const JSONMusic = getJSONMusic();
            modifyMusicService(currentID, JSONMusic)
        } else {
            alert("Please enter song name!")
        }
    }


    return (
        <div id="listMusic">
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
                    <Button variant="success" onClick={deleteMusic}>
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
                    <Table id="tableMusic" responsive>
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
                                getObjectByPagination(musicState.musics, currentPagination).map(e => {
                                    var link = `/singer/${e.singer.id}`
                                    return <tr key={e.id}>
                                        <td>{e.name}</td>
                                        <td>{e.releaseTime}</td>
                                        <td>{e.genre.name}</td>
                                        <td>{e.musician.name}</td>
                                        <td><a href={link}>{e.singer.name}</a></td>
                                        <td>
                                            <Button className="heartButton" onClick={() => preProcessChangePlaylist(e.id, e.isInPlaylist)} variant="info">

                                                {e.isInPlaylist === true ? <AiFillHeart /> : <AiOutlineHeart />}
                                            </Button>
                                            <Button className="modifyButton" onClick={() => preProcessModifyMusic(e)} variant="warning">
                                                <AiOutlineEdit />
                                            </Button>
                                            <Button className="deleteButton" onClick={() => preProcessDeleteMusic(e.id)} variant="danger">
                                                <AiOutlineDelete />
                                            </Button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                        <Pagination>{pagination}</Pagination>
                    </Table>
                </Row>
            </Col>
        </div>
    );
};

