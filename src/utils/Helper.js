import { ITEM_PER_PAGE} from "../constant/index"
export const getObjectByPagination = (object, pageNum) => {
    return object.slice((pageNum - 1)*ITEM_PER_PAGE, pageNum*ITEM_PER_PAGE )
}

export const isInArray = (object, array) => {
    for (var i = 0; i < array.length; i++) {
        if (object === array[i]) return true
    }
    return false;
}

export const getDateFromString = (string) => {
    var date = new Date()
    date.setMonth(parseInt(string.substr(5, 2)) - 1)
    date.setFullYear(string.substr(0, 4))
    date.setDate(string.substr(8, 2))
    return date
}