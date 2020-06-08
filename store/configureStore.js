// Store/configureStore.js
import { createStore, combineReducers } from 'redux'
import toggleFavorite from './reducers/favoriteReducer'
import setAvatar from './reducers/avatarReducer'

export default createStore(combineReducers({toggleFavorite, setAvatar}))
