import {
    MUSIC_SET_MUSICS_ACTION,
    MUSIC_SET_CURRENTMUSIC_ACTION,
    MUSIC_ADD_ACTION,
    MUSIC_MODIFY_ACTION,
    MUSIC_DELETE_ACTION
} from "../constant/actionConstant.js"


export const setMusicsAction = (musics) => {
    return {
        type: MUSIC_SET_MUSICS_ACTION,
        payload: musics
    }
}

export const setCurrentMusicAction = (music) => {
    return {
        type: MUSIC_SET_CURRENTMUSIC_ACTION,
        payload: music
    }
}

export const modifyMusicAction = (statusCode) => {
    return {
        type: MUSIC_MODIFY_ACTION,
        payload: statusCode
    }
}

export const addMusicAction = (music) => {
    return {
        type: MUSIC_ADD_ACTION,
        payload: music
    }
}

export const deleteMusicAction = (music_id) => {
    return {
        type: MUSIC_DELETE_ACTION,
        payload: music_id
    }
}
