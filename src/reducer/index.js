import { combineReducers } from "redux";
import MusicReducer from './MusicanReducer'
var RootReducer = combineReducers({
    music: MusicReducer,
});


export default RootReducer;