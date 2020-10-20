import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Table, Button, Modal, Form } from "react-bootstrap";
import { PAGE_HOME_TITLE } from "../../constant/index";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai'
import { HOST, PORT } from '../../constant'
import axios from 'axios';
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./ListMusic.scss";
const ListMusic = (props) => {
    // state
    const [musics, setMusices] = useState([])
    const [show, setShow] = useState(false);
    const [nameMusic, setNameMusic] = useState("");
    const [date, setDate] = useState(new Date());
    const [genre, setGenre] = useState("");
    const [musician, setMusician] = useState("");
    const [singer, setSinger] = useState("");
    // ref
    const datepickerRef = useRef(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // properties
    const listGenre = [{id:1, name: "A"}, {id:2, name: "B"}]
    const listMusician = [{id:1, name: "A"}, {id:2, name: "B"}]
    const listSinger = [{id:1, name: "A"}, {id:2, name: "B"}]
    useEffect(() => {
        async function fetch() {
            const result = await axios(`http://${HOST}:${PORT}/musics`)
            setMusices(result.data);
        }
        fetch()
    }, [])

    const deleteMusic = (id) => {
        console.log(id)
    }

    const addMusic = () => {
        // name, releaseTime, genreID, musicianID, singerID

        console.log(nameMusic)
        console.log(date)
        console.log(genre)
        console.log(musician)
        console.log(singer)
        handleClose()
    }

    const modifyMusic = () => {

    }

    return (

        <div id="listMusic">
            <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add music</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group controlId="nameArea">
                        <Form.Label>Music's name</Form.Label>
                        <Form.Control value={nameMusic} onChange={e => setNameMusic(e.target.value)}
                            as="textarea" placeholder="Enter name" />

                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Release time</Form.Label>
                        <br></br>
                        <ReactDatePicker selected={date}
                            onChange={setDate} ref={datepickerRef} id="datePicker" />
                    </Form.Group>
                    <Form.Group controlId="genreArea">
                        <Form.Label>Genre</Form.Label>
                        <Form.Control value={genre} onChange={e => setGenre(e.target.value)} as="select">
                            {
                                listGenre.map(e => {
                                    return <option key={e.id}> {e.name} </option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="musicianArea">
                        <Form.Label>Musician</Form.Label>
                        <Form.Control value={musician} onChange={e => setMusician(e.target.value)} as="select">
                            {
                                listMusician.map(e => {
                                    return <option key={e.id}> {e.name} </option>
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="singerArea">
                        <Form.Label>Singer</Form.Label>
                        <Form.Control value={singer} onChange={e => setSinger(e.target.value)} as="select">
                            {
                                listSinger.map(e => {
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


            <Button onClick={() => { console.log(nameMusic) }}>Click</Button>
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
                                musics.map(e => {
                                    return <tr key={e.id}>
                                        <td>{e.name}</td>
                                        <td>{e.releaseTime}</td>
                                        <td>{e.genre.name}</td>
                                        <td>{e.musican.name}</td>
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
