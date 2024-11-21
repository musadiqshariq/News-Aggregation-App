import { createSlice } from "@reduxjs/toolkit"; // Import createSlice from Redux Toolkit
import _ from "lodash";

// Initial state for the Guardian data slice
const initialState = {
  entities: [], // Array to store articles fetched from the API
  sections: [], // Array to store unique sections (used for filters)
};

// Define the slice using createSlice
export const GuardianSlice = createSlice({
  name: "Guardian", // Name of the slice, used as a prefix for action types
  initialState: initialState, // Initial state of the slice
  reducers: {
    // Reducer to set the articles data in the state
    setData: (state, actions) => {
      state.entities = actions.payload || []; // Update entities with the payload or an empty array
      if (state.sections?.length <= 0) {
        const sectionArray = actions.payload?.map((v) => {
          if (v.section) {
            return {
              label: v.section,
              value: v.sectionId,
            };
          }
        });
        // Remove duplicates
        state.sections =
          sectionArray?.length > 0 ? _.uniqBy(sectionArray, "label") : [];
      }
    },
  },
});
