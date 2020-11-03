import React, { useEffect, useState, useRef, useReducer } from "react";
import { Col, Row, Table, Button, Modal, Form, Dropdown, Pagination } from "react-bootstrap";
import {
    HOME_PAGE_TABLE_MUSIC_NAME,
    HOME_PAGE_TABLE_RELEASE_TIME,
    HOME_PAGE_TABLE_GENRE,
    HOME_PAGE_TABLE_MUSICIAN,
    HOME_PAGE_TABLE_SINGER,
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

import { setMusicsService } from '../../service/MusicService'
import { MusicReducer, initialMusicState } from '../../reducer/MusicReducer'
import { setMusicsAction } from '../../action/MusicAction'
import { getPlaylistByUIDService, deletePlaylistService } from '../../service/PlaylistService'
import { AiFillHeart } from 'react-icons/ai'

export const ListPlaylist = (props) => {
    const uid = 1
    
    const [isShowModalConfirm, setIsShowModalConfirm] = useState(false);
    const [musicState, musicDispatch] = useReducer(MusicReducer, initialMusicState);
    const [pagination, setPagination] = useState([])
    const [currentPagination, setCurrentPagination] = useState(1)
    const [currentSortName, setCurrentSortName] = useState(PLAYLIST_PAGE_SORTNAME_AZ)
    const [currentSortReleaseTime, setCurrentSortReleaseTime] = useState(PLAYLIST_PAGE_SORTRELEASETIME_AZ)
    const [currentSortGenre, setCurrentSortGenre] = useState(PLAYLIST_PAGE_SORTGENRE_AZ)
    const [currentSortSinger, setCurrentSortSinger] = useState(PLAYLIST_PAGE_SORTSINGER_AZ)
    const [currentSortMusician, setCurrentSortMusician] = useState(PLAYLIST_PAGE_SORTMUSICIAN_AZ)
    const [currentFilter, setCurrentFilter] = useState(PLAYLIST_PAGE_SORTNAME_AZ)
    const [currentMID, setCurrentMID] = useState(1)
    const handleCloseModalConfirm = () => setIsShowModalConfirm(false);
    const handleShowModalConfirm = () => setIsShowModalConfirm(true);

    useEffect(() => {
        const interval = setInterval(() => {

            setMusicsService().then(musics => {
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

    const deletePlaylist = () => {
        deletePlaylistService(uid, currentMID)
        handleCloseModalConfirm()
    }
    const preProcessDeletePlaylist = (mid) => {
        handleShowModalConfirm()
        setCurrentMID(mid)
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
                    <Button variant="success" onClick={deletePlaylist}>
                        {MODAL_BUTTON_YES}
                    </Button>

                </Modal.Footer>
            </Modal>
            <Col>
                <Row>
                    <Col><p id="pageTitle">{PLAYLIST_PAGE_TITLE}</p></Col>

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
                                    <div onClick={e => setSingerFilter(e.target.value)}>
                                        {currentSortSinger}
                                    </div>
                                </th>
                                <th>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filter(getObjectByPagination(musicState.musics, currentPagination)).map(e => { 
                                    if (e.isInPlaylist === true) {
                                        var link = `/singer/${e.singer.id}`
                                        return <tr key={e.id}>
                                            <td>{e.name}</td>
                                            <td>{e.releaseTime}</td>
                                            <td>{e.genre.name}</td>
                                            <td>{e.musician.name}</td>
                                            <td><a href={link}>{e.singer.name}</a></td>
                                            <td>
                                                <Button className="heartButton" onClick={() => preProcessDeletePlaylist(e.id)} variant="info">
                                                    <AiFillHeart/>
                                                </Button>
                                            </td>
                                        </tr>
                                    }

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

