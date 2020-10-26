import {

    GENRE_SET_GENRES_ACTION,
    GENRE_ADD_ACTION,
    GENRE_DELETE_ACTION,
    GENRE_MODIFY_ACTION
} from "../constant/actionConstant.js"


export const setGenresAction = (genres) => {
    return {
        type: GENRE_SET_GENRES_ACTION,
        payload: genres
    }
}


export const modifyGenreAction = (statusCode) => {
    return {
        type: GENRE_MODIFY_ACTION,
        payload: statusCode
    }
}

export const addGenreAction = (genre) => {
    return {
        type: GENRE_ADD_ACTION,
        payload: genre
    }
}

export const deleteGenreAction = (id) => {
    return {
        type: GENRE_DELETE_ACTION,
        payload: id
    }
}
