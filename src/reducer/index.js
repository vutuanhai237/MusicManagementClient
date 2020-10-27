import { combineReducers } from "redux";
import { MusicReducer } from './MusicReducer'
import { GenreReducer } from './GenreReducer'
import { MusicianReducer } from './MusicianReducer'
import { SingerReducer } from './SingerReducer'
var RootReducer = combineReducers({
    music: MusicReducer,
    genre: GenreReducer,
    musician: MusicianReducer,
    singer: SingerReducer
});


export default RootReducer;