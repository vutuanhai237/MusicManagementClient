import {
    HOST, PORT
} from '../constant'
import axios from 'axios';
export const getPlaylistByUIDService = async (uid) => {
    const result = await axios(`http://${HOST}:${PORT}/playlist?uid=${uid}`)
    return result
}


export const deletePlaylistService = async (uid, mid) => {
    var config = {
        method: 'delete',
        url: `http://${HOST}:${PORT}/playlist?uid=${uid}&mid=${mid}`,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const addPlaylistService = async (playlist) => {
    var config = {
        method: 'post',
        url: `http://${HOST}:${PORT}/playlist`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: playlist
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

