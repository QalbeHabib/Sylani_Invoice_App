import { combineReducers } from 'redux'
import { user } from './userReducer'
import { drawer } from './drawerReducer'

export default combineReducers({
    user,
    drawer
})
