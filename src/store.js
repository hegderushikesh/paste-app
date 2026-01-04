import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './redux/pasteredux'

export default configureStore({
  reducer: {
    paste: pasteReducer
  }
})