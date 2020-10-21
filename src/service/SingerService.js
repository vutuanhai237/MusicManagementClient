import {
    HOST, PORT
} from '../constant'
import axios from 'axios';
export const setSingersService = async () => {
    const result = await axios(`http://${HOST}:${PORT}/singers`)
    return result
}


