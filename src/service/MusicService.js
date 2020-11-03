import {
    HOST, PORT
} from '../constant'
import axios from 'axios';

export const setMusicsService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/musics`)
    return result
}

export const getMusicsBySingerService = async(singer) => {
    var config = {
        method: 'post',
        url: `http://${HOST}:${PORT}/musics_singer`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: singer
    };

    const result = await axios( `http://${HOST}:${PORT}/musics_singer`, config)
    return result
}
export const addMusicService = (music) => {
    var config = {
        method: 'post',
        url: `http://${HOST}:${PORT}/musics`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: music
    };

    axios(config)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error);
        });
}
export const deleteMusicService = (id) => {
    var config = {
        method: 'delete',
        url: `http://${HOST}:${PORT}/musics?id=${id}`,
        headers: {}
    };

    axios(config)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error);
        });
}

export const modifyMusicService = (id, music) => {
    var config = {
        method: 'put',
        url: `http://${HOST}:${PORT}/musics?id=${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: music
    };

    axios(config)
        .then(response => {
            console.log(1)
            console.log(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error);
            console.log(error.response.status);
        });

}