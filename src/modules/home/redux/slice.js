import { createSlice } from "@reduxjs/toolkit"; // Import createSlice from Redux Toolkit
import _ from "lodash";

// Initial state for The News Api data slice
const initialState = {
  entities: [], // Array to store articles fetched from the API
  totalRecords: 0,
  sources: [], // Array to store unique sources (used for filters)
};

// Define the slice using createSlice
export const HomeSlice = createSlice({
  name: "home", // Name of the slice, used as a prefix for action types
  initialState: initialState, // Initial state of the slice
  reducers: {
    // Reducer to set the articles data in the state
    setData: (state, actions) => {
      state.entities = actions.payload?.data || []; // Update entities with the payload or an empty array
      state.totalRecords = actions.payload.totalRecords || 0;
    },
    setSourcesData: (state, actions) => {
      const sourcesArray = actions.payload?.map((v) => ({
        label: v.name,
        value: v.id,
      }));
      // Remove duplicates
      state.sources =
        sourcesArray?.length > 0 ? _.uniqBy(sourcesArray, "label") : [];
    },
  },
});
