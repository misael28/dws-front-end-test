import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  selectedCategories: string[]
  selectedAuthors: string[]
  searchQuery: string
  sortOrder: 'newest' | 'oldest' | 'title'
}

const initialState: FilterState = {
  selectedCategories: [],
  selectedAuthors: [],
  searchQuery: '',
  sortOrder: 'newest'
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedCategories: (state, action: PayloadAction<string[]>) => {
      state.selectedCategories = action.payload
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.selectedCategories.includes(action.payload)) {
        state.selectedCategories.push(action.payload)
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategories = state.selectedCategories.filter(
        id => id !== action.payload
      )
    },
    clearCategories: (state) => {
      state.selectedCategories = []
    },
    setSelectedAuthors: (state, action: PayloadAction<string[]>) => {
      state.selectedAuthors = action.payload
    },
    addAuthor: (state, action: PayloadAction<string>) => {
      if (!state.selectedAuthors.includes(action.payload)) {
        state.selectedAuthors.push(action.payload)
      }
    },
    removeAuthor: (state, action: PayloadAction<string>) => {
      state.selectedAuthors = state.selectedAuthors.filter(
        id => id !== action.payload
      )
    },
    clearAuthors: (state) => {
      state.selectedAuthors = []
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setSortOrder: (state, action: PayloadAction<'newest' | 'oldest' | 'title'>) => {
      state.sortOrder = action.payload
    },
    clearAllFilters: (state) => {
      state.selectedCategories = []
      state.selectedAuthors = []
      state.searchQuery = ''
      state.sortOrder = 'newest'
    }
  }
})

export const {
  setSelectedCategories,
  addCategory,
  removeCategory,
  clearCategories,
  setSelectedAuthors,
  addAuthor,
  removeAuthor,
  clearAuthors,
  setSearchQuery,
  setSortOrder,
  clearAllFilters
} = filterSlice.actions

export default filterSlice.reducer 