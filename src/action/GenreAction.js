import {

    GENRE_SET_GENRES_ACTION,
    GENRE_SET_GENREQUANTITIES_ACTION,
    GENRE_ADD_ACTION,
    GENRE_DELETE_ACTION,
    GENRE_MODIFY_ACTION
} from "../constant/ActionConstant.js"


export const setGenresAction = (genres) => {
    return {
        type: GENRE_SET_GENRES_ACTION,
        payload: genres
    }
}

export const setGenreQuantitiesAction = (genreQuantities) => {
    return {
        type: GENRE_SET_GENREQUANTITIES_ACTION,
        payload: genreQuantities
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
