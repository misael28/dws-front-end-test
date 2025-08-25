import { configureStore } from '@reduxjs/toolkit'
import { api } from '../services/api'
import uiReducer from './uiSlice'
import filterReducer from './filterSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    ui: uiReducer,
    filter: filterReducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch