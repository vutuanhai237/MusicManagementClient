import {
    HOST, PORT
} from '../constant'
import axios from 'axios';
export const setMusiciansService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/musicians`)
    return result
}

export const setMusicianQuantitiesService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/musician_quantities`)
    return result
}

export const deleteMusicianService = async (id) => {
    var config = {
        method: 'delete',
        url: `http://${HOST}:${PORT}/musicians?id=${id}`,
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

export const addMusicianService = async (musician) => {
    var config = {
        method: 'post',
        url: `http://${HOST}:${PORT}/musicians`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: musician
    };

    axios(config)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error);
        });
}


export const modifyMusicianService = async (id, musician) => {
    var config = {
        method: 'put',
        url: `http://${HOST}:${PORT}/musicians?id=${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: musician
    };

    axios(config)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error);
        });
}