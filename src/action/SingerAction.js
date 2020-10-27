import {

    SINGER_SET_SINGERS_ACTION,
    SINGER_SET_SINGERQUANTITIES_ACTION,
    SINGER_ADD_ACTION,
    SINGER_DELETE_ACTION,
    SINGER_MODIFY_ACTION
} from "../constant/ActionConstant.js"


export const setSingersAction = (singers) => {
    return {
        type: SINGER_SET_SINGERS_ACTION,
        payload: singers
    }
}

export const setSingerQuantitiesAction = (singerQuantities) => {
    return {
        type: SINGER_SET_SINGERQUANTITIES_ACTION,
        payload: singerQuantities
    }
}

export const modifySingerAction = (statusCode) => {
    return {
        type: SINGER_MODIFY_ACTION,
        payload: statusCode
    }
}

export const addSingerAction = (singer) => {
    return {
        type: SINGER_ADD_ACTION,
        payload: singer
    }
}

export const deleteSingerAction = (id) => {
    return {
        type: SINGER_DELETE_ACTION,
        payload: id
    }
}
