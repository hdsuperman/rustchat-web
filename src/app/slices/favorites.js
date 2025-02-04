import { createSlice } from "@reduxjs/toolkit";
// import BASE_URL from "../config";
const initialState = [];
const favoritesSlice = createSlice({
  name: `favorites`,
  initialState,
  reducers: {
    fullfillFavorites(state, action) {
      return action.payload;
    },
    addFavorite(state, action) {
      state.push(action.payload);
    },
    deleteFavorite(state, action) {
      const id = action.payload;
      const idx = state.findIndex((f) => f.id == id);
      if (idx > -1) {
        state.splice(idx, 1);
      }
    },
    populateFavorite(state, action) {
      const { id, messages } = action.payload;
      const idx = state.findIndex((fav) => fav.id == id);
      if (idx > -1) {
        state[idx].messages = messages;
      }
    }
  }
});
export const { addFavorite, deleteFavorite, fullfillFavorites, populateFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
