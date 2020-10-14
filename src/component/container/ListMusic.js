import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { PAGE_HOME_TITLE } from "../../constant/index";
import { useSelector, useDispatch } from 'react-redux';
import { getMusicAPI } from '../../service/MusicService'
import {HOST, PORT} from '../../constant'
import "./ListMusic.scss";
const ListMusic = (props) => {
    let [musics, setMusices] = useState([])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
          };
          
          fetch(`http://${HOST}:${PORT}/musics`, requestOptions)
            .then(response => {
                response.text()
            })
            .then(result => {
                console.log(1111111)
                console.log((result))
            })
            .catch(error => console.log('error', error));
    })

    // const { musics } = this.props;
    return (
        <div id="pageHome">
            <Col>
                <Row>
                    <p id="pageTitle">{PAGE_HOME_TITLE}</p>
                </Row>
                <Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Song name</th>
                                <th>Genre</th>
                                <th>Musican</th>
                                <th>Singer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {
                                musics.map(e => {
                                    return <tr>
                                        <td>{e.name}</td>
                                        <td>{e.releaseTime}</td>
                                        <td>{e.musican}</td>
                                        <td>{e.genre.name}</td>
                                    </tr>
                                })
                            } */}
                        </tbody>
                    </Table>
                </Row>
            </Col>
        </div>
    );
};


export default ListMusic;
