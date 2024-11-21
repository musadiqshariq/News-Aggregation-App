import { message } from "antd"; // Ant Design's message component for notifications
import * as requests from "./requests"; // API request functions
import { NewYorkTimesSlice } from "./slice"; // Redux slice for managing New York Times data

const { actions } = NewYorkTimesSlice; // Extract actions from the slice

// Utility function to show error messages
const showError = (messageText) => {
  message.error(messageText, 3); // Display error message for 3 seconds
};

// Async action to fetch articles from The New York Times API
export const searchArcticlesFromNewYorkTimesAction =
  (query, filterQuery, setIsLoading, onSuccess) => async (dispatch) => {
    try {
      // Make API call to fetch articles based on query and filter parameters
      const response = await requests.searchArcticlesFromNewYorkTimes(
        query,
        filterQuery
      );

      // Extract articles from the response
      const articles = response?.data?.response?.docs;

      // Dispatch action to update Redux state with transformed article data
      dispatch(
        actions.setData(
          articles?.length > 0
            ? articles?.map((v) => ({
                // Transform the API response to match the application's data model
                thumbnail: v.multimedia[0]?.url
                  ? `https://static01.nyt.com/${v.multimedia[0]?.url}`
                  : null, // Add thumbnail if available
                abstract: v.abstract, // Summary of the article
                date: v.pub_date, // Publication date
                section: v.section_name, // Section name of the article
                url: v.web_url, // Link to the full article
                title: v.headline?.main, // Main headline of the article
              }))
            : [] // If no articles are returned, set an empty array
        )
      );

      // Call the success callback if provided
      onSuccess && onSuccess();
    } catch (error) {
      console.log("Error ===>", error); // Log the error for debugging

      // Handle specific error cases
      if (error?.status == 429) {
        // Show error message for quota limit exceeded
        showError("Quota limit exceeded. Please try again later.");
      }
    } finally {
      // Ensure that loading state is updated, regardless of success or failure
      setIsLoading && setIsLoading(false);
    }
  };

// Async action to fetch sections list from The New York Times API

export const getSectionListFromNewYorkTimesAction = () => async (dispatch) => {
  try {
    const response = await requests.getSectionListFromNewYorkTimes();
    dispatch(actions.setSectionsData(response.data?.results));
  } catch (error) {
    console.log("Error ==>", error);
  }
};
