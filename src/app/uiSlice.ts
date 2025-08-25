import { createSlice } from '@reduxjs/toolkit'

interface UIState {
  theme: 'light' | 'dark'
  search: string
  selectedPostId: string | null
}

const initialState: UIState = {
  theme: 'light',
  search: '',
  selectedPostId: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme(state){ state.theme = state.theme === 'light' ? 'dark' : 'light' },
    setSearch(state, {payload}){ 
      state.search = payload 
    },
    setSelectedPostId(state, {payload}: {payload: string | null}){ 
      state.selectedPostId = payload 
    }
  }
})

export const { toggleTheme, setSearch, setSelectedPostId } = uiSlice.actions
export default uiSlice.reducer