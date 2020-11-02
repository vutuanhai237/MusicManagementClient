import { ITEM_PER_PAGE} from "../constant/index"
export const getObjectByPagination = (object, pageNum) => {
    return object.slice((pageNum - 1)*ITEM_PER_PAGE, pageNum*ITEM_PER_PAGE )
}