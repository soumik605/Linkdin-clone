import UserReducer from './UserReducer'
import RoomReducer from './RoomReducer'
import PostReducer from './PostReducer'
import AuthReducer from './AuthReducer'
import {combineReducers} from 'redux'

export default combineReducers({
   UserReducer,
   RoomReducer,
   PostReducer,
   AuthReducer
})