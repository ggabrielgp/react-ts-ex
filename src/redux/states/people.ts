import { Person, localStorageType } from "@/models";
import { getLocalStorage, setLocalStorage } from "@/utilities";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Person[] = [];

export const peopleSlice = createSlice({
  name: 'people',
  initialState: getLocalStorage(localStorageType.PEOPLE) ? JSON.parse(getLocalStorage(localStorageType.PEOPLE) as string) : initialState,
  reducers: {
    addPeople: (state, action) => {
      // state->estado actual | "action: 'people/addPeople ', payload: [...state, objeto] "
      setLocalStorage(localStorageType.PEOPLE, state)
      return action.payload;
    },
    removePeople: () => {
      return [];
    }
  },
});

export const { addPeople } = peopleSlice.actions;