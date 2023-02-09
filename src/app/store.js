import { configureStore } from '@reduxjs/toolkit';

import { tmdbApi } from '../services/TMDB';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

// I don't know if the middleware is needed here, but I added it anyway. It's the only way I could get it to run without errors.
