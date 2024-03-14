import { Person, localStorageType } from "@/models";
import { getLocalStorage, setLocalStorage } from "@/utilities";
import { createSlice, current } from "@reduxjs/toolkit";

const initialState: Person[] = [];

const initialStateTest = () => {
  const localStorageData = getLocalStorage(localStorageType.FAVORITES) ? JSON.parse(getLocalStorage(localStorageType.FAVORITES) as string) : initialState;
  return localStorageData;
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialStateTest(),
  reducers: {
    addFavorite: (state, action) => { // "type: 'favorite/addFavorite ', payload: [...state, objeto] "
      setLocalStorage(localStorageType.FAVORITES, action.payload)
      return action.payload;
    },
    removeFavoriteByPersonId: (state, action) => {
      const filteredState = current(state).filter((person: Person) => person.id !== action.payload.id);
      setLocalStorage(localStorageType.FAVORITES, filteredState)
      return action.payload;
    }
  }
});

export const { addFavorite, removeFavoriteByPersonId } = favoritesSlice.actions;