import { createSlice } from '@reduxjs/toolkit';

export const genreOrCategory = createSlice({
  name: 'genreOrCategory',
  initialState: {
    genreOrCategoryName: '',
    page: 1,
    searchQuery: '',
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      console.log('action.payload', action.payload); // this will give us the category name/id
      // TODO: Assign the payload and update the state with that value
      state.genreOrCategoryName = action.payload;
    },
  },
});

export const { selectGenreOrCategory } = genreOrCategory.actions;

export default genreOrCategory.reducer;
