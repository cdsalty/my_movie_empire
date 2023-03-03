import { createSlice } from '@reduxjs/toolkit';

export const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState: {
    genreIdOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      // console.log('action.payload', action.payload); // this will give us the category name/id
      // Assign the payload and update the state with that value
      state.genreIdOrCategoryName = action.payload;
      // To reset the category, we need to set the searchQuery to an empty string
      state.searchQuery = '';
    },
    searchMovie: (state, action) => {
      state.searchQuery = action.payload;
      // state.genreIdOrCategoryName = '';
    },
  },
});

export const { selectGenreOrCategory, searchMovie } = genreOrCategory.actions;

export default genreOrCategory.reducer;
