import {
    HOST, PORT
} from '../constant'
import axios from 'axios';
export const setGenresService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/genres`)
    return result
}

export const setGenreQuantitiesService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/genre_quantities`)
    return result
}

export const deleteGenreService = async (id) => {
    var config = {
        method: 'delete',
        url: `http://${HOST}:${PORT}/genres?id=${id}`,
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

export const addGenreService = async (genre) => {
    var config = {
        method: 'post',
        url: `http://${HOST}:${PORT}/genres`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: genre
    };

    axios(config)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error);
        });
}


export const modifyGenreService = async (id, genre) => {
    var config = {
        method: 'put',
        url: `http://${HOST}:${PORT}/genres?id=${id}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: genre
    };

    axios(config)
        .then(response => {
            console.log(JSON.stringify(response.data));
        })
        .catch(error => {
            console.log(error);
        });
}