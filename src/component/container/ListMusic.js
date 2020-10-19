import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import { PAGE_HOME_TITLE } from "../../constant/index";
import { useSelector, useDispatch } from 'react-redux';
import { getMusicAPI } from '../../service/MusicService'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineFileAdd } from 'react-icons/ai'
import { HOST, PORT } from '../../constant'
import axios from 'axios';
import "./ListMusic.scss";
const ListMusic = (props) => {
    const [musics, setMusices] = useState([])
    useEffect(() => {
        async function fetch() {
            const result = await axios(`http://${HOST}:${PORT}/musics`)
            setMusices(result.data);
        }
        fetch()
    }, [])

    function deleteMusic (id) {
        console.log(id)
    }

    function addMusic () {

    }

    function modifyMusic () {

    }

    return (
        <div id="listMusic">
            <Button onClick={() => { console.log(musics) }}>Click</Button>
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
                                <th><Button variant="success">
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
                                            <Button className="modifyButton" onClick={()=> modifyMusic()} variant="warning">
                                                <AiOutlineEdit />
                                            </Button>
                                            <Button className="deleteButton" onClick={()=> deleteMusic(e.id)} variant="danger">
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
