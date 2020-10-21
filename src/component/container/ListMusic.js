import React, { useEffect, useState, useRef, useReducer } from "react";
import { Col, Row, Table, Button, Modal, Form } from "react-bootstrap";
import { PAGE_HOME_TITLE, SINGER_SET_SINGERS_ACTION, SINGER_SET_CURRENTSINGER_ACTION } from "../../constant/index";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai'
import { HOST, PORT } from '../../constant'
import axios from 'axios';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ListMusic.scss";
import { MusicReducer, initialMusicState } from '../../reducer/MusicReducer'
import { setMusicsAction, addMusicAction } from '../../action/MusicAction'
import { setMusicsService } from '../../service/MusicService'
import { setSingersService } from '../../service/SingerService'
import { SingerReducer, initialSingerState } from '../../reducer/SingerReducer'
import { setSingersAction, setCurrentSingerAction } from '../../action/SingerAction'

import { setGenresService } from '../../service/GenreService'
import { GenreReducer, initialGenreState } from '../../reducer/GenreReducer'
import { setGenresAction, setCurrentGenreAction } from '../../action/GenreAction'
const ListMusic = (props) => {
    // reducer
    const [singerState, singerDispatch] = useReducer(SingerReducer, initialSingerState);
    const [genreState, genreDispatch] = useReducer(GenreReducer, initialGenreState);
    const [musicState, musicDispatch] = useReducer(MusicReducer, initialMusicState);

    // state
    const [isShowModal, setIsShowModal] = useState(false);
    const [releaseTime, setReleaseTime] = useState(new Date());
    const [currentName, setCurrentName] = useState("");
    const [currentMusician, setCurrentMusician] = useState();
    const [musicians, setMusicians] = useState([]);
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
            singerDispatch(setCurrentSingerAction(result.data[0].name))
        })

        setGenresService().then(result => {
            genreDispatch(setGenresAction(result.data))
            genreDispatch(setCurrentGenreAction(result.data[0].name))
        })
    }, [])

    useEffect(() => {
        async function fetch() {
            const result = await axios(`http://${HOST}:${PORT}/musicians`)
            if (result !== null) {
                setMusicians(result.data);
                setCurrentMusician(result.data[0].name)
            }
        }
        fetch()
    }, [])



    const deleteMusic = (id) => {
        console.log(id)
    }

    const addMusic = () => {
        // name, releaseTime, genreID, musicianID, singerID
        if (currentName !== "") {
            const music = {
                "name": currentName,
                "releaseTime": releaseTime.getFullYear() + "-" + (releaseTime.getMonth() + 1) + "-" + releaseTime.getDate(),
                "genre": (genreState.genres.filter(i => i.name === genreState.currentGenre))[0],
                "singer": (singerState.singers.filter(i => i.name === singerState.currentSinger))[0],
                "musician": (musicians.filter(i => i.name === currentMusician))[0]
            }
            handleClose()
            const JSONMusic = JSON.stringify(music);
            var config = {
                method: 'post',
                url: `http://${HOST}:${PORT}/musics`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSONMusic
            };

            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    alert("Add music successfullly!")
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("Please enter song name!")
        }
    }

    const modifyMusic = () => {

    }

    return (
        <div id="listMusic">
            <Modal show={isShowModal} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add music</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="nameArea">
                        <Form.Label>Music's name</Form.Label>
                        <Form.Control value={currentName} onChange={e => setCurrentName(e.target.value)} type="text" placeholder="Enter name" />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Release time</Form.Label>
                        <br></br>
                        <ReactDatePicker selected={releaseTime}
                            onChange={setReleaseTime} ref={datepickerRef} id="datePicker" />
                    </Form.Group>
                    <Form.Group controlId="genreArea">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control value={genreState.currentGenre} onChange={e => genreDispatch(setCurrentGenreAction(e.target.value))} as="select">
                            {
                                genreState.genres.map(e => {
                                    return <option key={e.id}> {e.name} </option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="musicianArea">
                        <Form.Label>Musician</Form.Label>
                        <Form.Control value={currentMusician} onChange={e => setCurrentMusician(e.target.value)} as="select">
                            {
                                musicians.map(e => {
                                    return <option key={e.id}> {e.name} </option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="singerArea">
                        <Form.Label>Singer</Form.Label>
                        <Form.Control value={singerState.currentSinger} onChange={e => singerDispatch(setCurrentSingerAction(e.target.value))} as="select">
                            {
                                singerState.singers.map(e => {
                                    return <option key={e.id}> {e.name} </option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="success" onClick={addMusic}>
                        Add
                    </Button>

                </Modal.Footer>
            </Modal>


            <Button onClick={() => {

            }}>Click</Button>
            <Col>
                <Row>
                    <p id="pageTitle">{PAGE_HOME_TITLE}</p>

                </Row>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Song name</th>
                                <th>Release time</th>
                                <th>Genre</th>
                                <th>Musican</th>
                                <th>Singer</th>
                                <th><Button variant="success" onClick={handleShow}>
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
                                            <Button className="modifyButton" onClick={() => modifyMusic()} variant="warning">
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


export default ListMusic;
