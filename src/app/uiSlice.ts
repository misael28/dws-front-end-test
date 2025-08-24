import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  theme: 'light' | 'dark'
  search: string
}

const initialState: UIState = {
  theme: 'light',
  search: ''
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state){ state.theme = state.theme === 'light' ? 'dark' : 'light' },
    setSearch(state, {payload}){ state.search = payload }
  }
})

export const { toggleTheme, setSearch } = uiSlice.actions
export default uiSlice.reducer