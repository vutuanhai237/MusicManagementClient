import {

    GENRE_SET_GENRES_ACTION,
    GENRE_SET_CURRENTGENRE_ACTION,
} from "../constant/index.js"


export const setGenresAction = (genres) => {
    return {
        type: GENRE_SET_GENRES_ACTION,
        payload: genres
    }
}

export const setCurrentGenreAction = (genreName) => {
    return {
        type: GENRE_SET_CURRENTGENRE_ACTION,
        payload: genreName
    }
}