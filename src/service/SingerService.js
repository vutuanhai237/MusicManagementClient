import {
    HOST, PORT
} from '../constant'
import axios from 'axios';
export const setSingersService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/singers`)
    return result
}

export const setSingerQuantitiesService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/singer_quantities`)
    return result
}

export const deleteSingerService = async (id) => {
    var config = {
        method: 'delete',
        url: `http://${HOST}:${PORT}/singers?id=${id}`,
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

export const addSingerService = async (Singer) => {
    var config = {
        method: 'post',
        url: `http://${HOST}:${PORT}/singers`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: Singer
    };

    axios(config)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error);
        });
}


export const modifySingerService = async (id, singer) => {
    var config = {
        method: 'put',
        url: `http://${HOST}:${PORT}/singers?id=${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: singer
    };

    axios(config)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error);
        });
}