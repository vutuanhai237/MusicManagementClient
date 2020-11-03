import {
    PLAYLIST_GET_PLAYLISTBYUID_ACTION,
    PLAYLIST_ADD_ACTION,
    PLAYLIST_DELETE_ACTION
} from "../constant/ActionConstant.js"


export const setPlaylistsAction = (playlist) => {
    return {
        type: PLAYLIST_GET_PLAYLISTBYUID_ACTION,
        payload: playlist
    }
}


export const addPlaylistAction = (playlist) => {
    return {
        type: PLAYLIST_ADD_ACTION,
        payload: playlist
    }
}

export const deletePlaylistAction = (uid, mid) => {
    return {
        type: PLAYLIST_DELETE_ACTION,
        payload: {
            uid: uid,
            mid: mid
        }
    }
}
