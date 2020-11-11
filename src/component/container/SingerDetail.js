import React, { useEffect, useState, useRef, useReducer } from "react";
import { Col, Row, Table, Button, Modal, Form, Dropdown, Pagination } from "react-bootstrap";
import {
    HOME_PAGE_MODAL_TITLE_ADD_MUSIC,
    HOME_PAGE_MODAL_TITLE_MODIFY_MUSIC
} from "../../constant/HomePageConstant";
import {
    HOME_PAGE_MODAL_MUSIC_NAME,
    HOME_PAGE_MODAL_RELEASE_TIME,
    HOME_PAGE_MODAL_GENRE,
    HOME_PAGE_MODAL_MUSICIAN,
    HOME_PAGE_MODAL_SINGER,
    HOME_PAGE_MODAL_BUTTON_ADD,
    HOME_PAGE_MODAL_BUTTON_MODIFY,
    HOME_PAGE_MODAL_BUTTON_CLOSE,
} from "../../constant/HomePageConstant";
import {
    PLAYLIST_PAGE_SORTNAME_AZ,
    PLAYLIST_PAGE_SORTNAME_ZA,
    PLAYLIST_PAGE_SORTSINGER_AZ,
    PLAYLIST_PAGE_SORTSINGER_ZA,
    PLAYLIST_PAGE_SORTGENRE_AZ,
    PLAYLIST_PAGE_SORTGENRE_ZA,
    PLAYLIST_PAGE_SORTMUSICIAN_AZ,
    PLAYLIST_PAGE_SORTMUSICIAN_ZA,
    PLAYLIST_PAGE_SORTRELEASETIME_AZ,
    PLAYLIST_PAGE_SORTRELEASETIME_ZA
} from "../../constant/PlaylistPageConstant";

import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd, AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { PLAYLIST_PAGE_TITLE } from '../../constant/PlaylistPageConstant'
import { getObjectByPagination, isInArray } from "../../utils/Helper"
import { IconContext } from "react-icons";
import {
    ITEM_PER_PAGE,
    MODAL_CONFIRM_TITLE,
    MODAL_CONFIRM_BODY,
    MODAL_BUTTON_NO,
    MODAL_BUTTON_YES
} from "../../constant/index"
import "react-datepicker/dist/react-datepicker.css";
import "./ListMusic.scss";
import ReactDatePicker from "react-datepicker"
// import ReactDatePicker from "react-datepicker";
import { CustomToggle, CustomMenu } from '../MusicManagement/DropDown'
import { addPlaylistService, getPlaylistByUIDService, deletePlaylistService } from '../../service/PlaylistService'

import { getMusicsBySingerService, deleteMusicService, modifyMusicService, addMusicService } from '../../service/MusicService'
import { MusicReducer, initialMusicState } from '../../reducer/MusicReducer'
import { setMusicsAction } from '../../action/MusicAction'


import { setSingersService, getSingerByIdService } from '../../service/SingerService'
import { SingerReducer, initialSingerState } from '../../reducer/SingerReducer'
import { setSingersAction } from '../../action/SingerAction'

import { setGenresService } from '../../service/GenreService'
import { GenreReducer, initialGenreState } from '../../reducer/GenreReducer'
import { setGenresAction } from '../../action/GenreAction'

import { setMusiciansService } from '../../service/MusicianService'
import { MusicianReducer, initialMusicianState } from '../../reducer/MusicianReducer'
import { setMusiciansAction } from '../../action/MusicianAction'


export const SingerDetail = (props) => {
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
    const [currentMID, setCurrentMID] = useState(0);
    const [releaseTime, setReleaseTime] = useState(new Date());
    const [currentName, setCurrentName] = useState("");
    const [currentGenre, setCurrentGenre] = useState("");
    const [currentSinger, setCurrentSinger] = useState("");
    const [currentFetchedSinger, setCurrentFetchedSinger] = useState({});
    const [currentMusician, setCurrentMusician] = useState("");
    const [pagination, setPagination] = useState([])
    const [currentPagination, setCurrentPagination] = useState(1)

    const [currentSortName, setCurrentSortName] = useState(PLAYLIST_PAGE_SORTNAME_AZ)
    const [currentSortReleaseTime, setCurrentSortReleaseTime] = useState(PLAYLIST_PAGE_SORTRELEASETIME_AZ)
    const [currentSortGenre, setCurrentSortGenre] = useState(PLAYLIST_PAGE_SORTGENRE_AZ)
    const [currentSortSinger, setCurrentSortSinger] = useState(PLAYLIST_PAGE_SORTSINGER_AZ)
    const [currentSortMusician, setCurrentSortMusician] = useState(PLAYLIST_PAGE_SORTMUSICIAN_AZ)
    const [currentFilter, setCurrentFilter] = useState(PLAYLIST_PAGE_SORTNAME_AZ)
    const datepickerRef = useRef(null);
    const handleClose = () => setIsShowModal(false);
    const handleShow = () => setIsShowModal(true);
    const handleCloseModalConfirm = () => setIsShowModalConfirm(false);
    const handleShowModalConfirm = () => setIsShowModalConfirm(true);
    const uid = 1
    useEffect(() => {

    }, [])
    useEffect(() => {
        setSingersService().then(singers => {
            singerDispatch(setSingersAction(singers.data))

        })

        setGenresService().then(genres => {
            genreDispatch(setGenresAction(genres.data))
        })

        setMusiciansService().then(musicians => {
            musicianDispatch(setMusiciansAction(musicians.data))
        })
        const url = window.location.href;
        const index = url.search("singer/");
        const id = url.slice(index + 7, url.length);

        const interval = setInterval(() => {
            getSingerByIdService(id).then(singer => {
                setCurrentFetchedSinger(singer.data)
                getMusicsBySingerService(singer.data).then(musics => {
                    getPlaylistByUIDService(uid).then(playlist => {
                        var numberIsInPlaylist = 0
                        for (var i = 0; i < musics.data.length; i++) {
                            var isInPlaylist = isInArray(musics.data[i].id, playlist.data)
                            musics.data[i]["isInPlaylist"] = isInPlaylist
                            if (isInPlaylist) numberIsInPlaylist = numberIsInPlaylist + 1

                        }
                        musicDispatch(setMusicsAction(musics.data))
                        var pagination = []
                        for (let number = 1; number <= numberIsInPlaylist / ITEM_PER_PAGE + 1; number++) {
                            pagination.push(
                                <Pagination.Item onClick={() => setCurrentPagination(number)} key={number}>
                                    {number}
                                </Pagination.Item>,
                            );
                        }
                        setPagination(pagination)
                    })
                })
            })

        }, 500);
        return () => clearInterval(interval);
    }, [])

    const setNameFilter = () => {
        currentSortName === PLAYLIST_PAGE_SORTNAME_AZ ? setCurrentSortName(PLAYLIST_PAGE_SORTNAME_ZA) : setCurrentSortName(PLAYLIST_PAGE_SORTNAME_AZ)
        setCurrentFilter(currentSortName === PLAYLIST_PAGE_SORTNAME_AZ ? PLAYLIST_PAGE_SORTNAME_ZA : PLAYLIST_PAGE_SORTNAME_AZ)

    }
    const setGenreFilter = () => {
        currentSortGenre === PLAYLIST_PAGE_SORTGENRE_AZ ? setCurrentSortGenre(PLAYLIST_PAGE_SORTGENRE_ZA) : setCurrentSortGenre(PLAYLIST_PAGE_SORTGENRE_AZ)
        setCurrentFilter(currentSortGenre === PLAYLIST_PAGE_SORTGENRE_AZ ? PLAYLIST_PAGE_SORTGENRE_ZA : PLAYLIST_PAGE_SORTGENRE_AZ)

    }

    const setSingerFilter = () => {
        currentSortSinger === PLAYLIST_PAGE_SORTSINGER_AZ ? setCurrentSortSinger(PLAYLIST_PAGE_SORTSINGER_ZA) : setCurrentSortSinger(PLAYLIST_PAGE_SORTSINGER_AZ)
        setCurrentFilter(currentSortSinger === PLAYLIST_PAGE_SORTSINGER_AZ ? PLAYLIST_PAGE_SORTSINGER_ZA : PLAYLIST_PAGE_SORTSINGER_AZ)

    }

    const setMusicianFilter = () => {
        currentSortMusician === PLAYLIST_PAGE_SORTMUSICIAN_AZ ? setCurrentSortMusician(PLAYLIST_PAGE_SORTMUSICIAN_ZA) : setCurrentSortMusician(PLAYLIST_PAGE_SORTMUSICIAN_AZ)
        setCurrentFilter(currentSortMusician === PLAYLIST_PAGE_SORTMUSICIAN_AZ ? PLAYLIST_PAGE_SORTMUSICIAN_ZA : PLAYLIST_PAGE_SORTMUSICIAN_AZ)

    }

    const setReleaseTimeFilter = (e) => {
        currentSortReleaseTime === PLAYLIST_PAGE_SORTRELEASETIME_AZ ? setCurrentSortReleaseTime(PLAYLIST_PAGE_SORTRELEASETIME_ZA) : setCurrentSortReleaseTime(PLAYLIST_PAGE_SORTRELEASETIME_AZ)
        setCurrentFilter(currentSortReleaseTime === PLAYLIST_PAGE_SORTRELEASETIME_AZ ? PLAYLIST_PAGE_SORTRELEASETIME_ZA : PLAYLIST_PAGE_SORTRELEASETIME_AZ)

    }

    const filter = (musics) => {

        switch (currentFilter) {
            case PLAYLIST_PAGE_SORTNAME_AZ:
                return musics.sort((a, b) => {
                    return ('' + a.name).localeCompare(b.name);
                })
            case PLAYLIST_PAGE_SORTNAME_ZA:

                return musics.sort((a, b) => {
                    return ('' + b.name).localeCompare(a.name);
                })
            case PLAYLIST_PAGE_SORTGENRE_AZ:
                return musics.sort((a, b) => {
                    return ('' + a.genre.name).localeCompare(b.genre.name);
                })
            case PLAYLIST_PAGE_SORTGENRE_ZA:

                return musics.sort((a, b) => {
                    return ('' + b.genre.name).localeCompare(a.genre.name);
                })

            case PLAYLIST_PAGE_SORTSINGER_AZ:
                return musics.sort((a, b) => {
                    return ('' + a.singer.name).localeCompare(b.singer.name);
                })
            case PLAYLIST_PAGE_SORTSINGER_ZA:

                return musics.sort((a, b) => {
                    return ('' + b.singer.name).localeCompare(a.singer.name);
                })

            case PLAYLIST_PAGE_SORTMUSICIAN_AZ:
                return musics.sort((a, b) => {
                    return ('' + a.musician.name).localeCompare(b.musician.name);
                })
            case PLAYLIST_PAGE_SORTMUSICIAN_ZA:

                return musics.sort((a, b) => {
                    return ('' + b.musician.name).localeCompare(a.musician.name);
                })

            case PLAYLIST_PAGE_SORTRELEASETIME_AZ:

                return musics.sort((a, b) => {
                    return (a.releaseTime.substr(0, 4) - b.releaseTime.substr(0, 4))
                })
            case PLAYLIST_PAGE_SORTRELEASETIME_ZA:

                return musics.sort((a, b) => {
                    return (b.releaseTime.substr(0, 4) - a.releaseTime.substr(0, 4))
                })
            default:
                return musics
        }
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

    const deletePlaylist = () => {
        //deletePlaylistService(uid, currentMID)
        handleCloseModalConfirm()
    }
    const preProcessDeletePlaylist = (mid) => {
        handleShowModalConfirm()
        setCurrentMID(mid)
    }

    const deleteMusic = () => {
        handleCloseModalConfirm()
        deleteMusicService(currentID)
    }


    const preProcessDeleteMusic = (id) => {
        handleShowModalConfirm()
        setCurrentID(id)
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
                    <Button variant="success" onClick={modifyMusic}>
                        {HOME_PAGE_MODAL_BUTTON_MODIFY}
                    </Button>
                </Modal.Footer>
            </Modal>

            <Col>
                <Row>
                    <Col><p id="pageTitle">{"Singer " + currentFetchedSinger.name}</p></Col>
                    
                </Row>
                <Row>
                <Col><p>{"Birthday: " + currentFetchedSinger.birthday + ", Sex: " + currentFetchedSinger.sex}</p></Col>
               
                </Row>
                <Row>
                    <Table id="tableMusic" responsive>
                        <thead>
                            <tr>
                                <th >
                                    <div onClick={e => setNameFilter(e.target.value)}>
                                        {currentSortName}
                                    </div>
                                </th>
                                <th>
                                    <div onClick={e => setReleaseTimeFilter(e.target.value)}>
                                        {currentSortReleaseTime}
                                    </div>
                                </th>
                                <th>
                                    <div onClick={e => setGenreFilter(e.target.value)}>
                                        {currentSortGenre}
                                    </div>
                                </th>
                                <th>
                                    <div onClick={e => setMusicianFilter(e.target.value)}>
                                        {currentSortMusician}
                                    </div>
                                </th>

                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filter(getObjectByPagination(musicState.musics, currentPagination)).map(e => {

                                    return <tr key={e.id}>
                                        <td>{e.name}</td>
                                        <td>{e.releaseTime}</td>
                                        <td>{e.genre.name}</td>
                                        <td>{e.musician.name}</td>
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
    )


}

