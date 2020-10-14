import {
    MUSIC_GET_ACTION,
    MUSIC_ADD_ACTION,
    MUSIC_MODIFY_ACTION,
    MUSIC_DELETE_ACTION
} from "../constant/index.js"


export function getMusic(musics, statusCode) {
    return {
        type: MUSIC_ADD_ACTION,
        payload: {
            musics: musics,
            statusCode: statusCode
        },
    }
}

export function postMusic(statusCode) {
    return {
        type: MUSIC_ADD_ACTION,
        payload: {
            statusCode: statusCode
        },
    }
}

export function putMusic(statusCode) {
    return {
        type: MUSIC_MODIFY_ACTION,
        payload: {
            statusCode: statusCode
        },
    }
}

export function deleteMusic(statusCode) {
    return {
        type: MUSIC_DELETE_ACTION,
        payload: {
            statusCode: statusCode
        },
    }
}

