import { createSlice } from "@reduxjs/toolkit"; // Import createSlice from Redux Toolkit
import _ from "lodash";

// Initial state for the New York Times data slice
const initialState = {
  entities: [], // Array to store articles fetched from the API
  sections: [], // Array to store unique sections (used for filters)
};

// Define the slice using createSlice
export const NewYorkTimesSlice = createSlice({
  name: "newYorkTimes", // Name of the slice, used as a prefix for action types
  initialState: initialState, // Initial state of the slice
  reducers: {
    // Reducer to set the articles data in the state
    setData: (state, actions) => {
      state.entities = actions.payload || []; // Update entities with the payload or an empty array
    },
    setSectionsData: (state, actions) => {
      const sectionArray = actions.payload?.map((v) => ({
        label: v.display_name,
        value: v.section,
      }));
      // Remove duplicates
      state.sections =
        sectionArray?.length > 0 ? _.uniqBy(sectionArray, "label") : [];
    },
  },
});
