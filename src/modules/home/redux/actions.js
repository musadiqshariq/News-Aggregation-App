import { message } from "antd"; // Ant Design's message component for notifications
import * as requests from "./requests"; // API request functions
import { HomeSlice } from "./slice"; // Redux slice for managing News data

const { actions } = HomeSlice; // Extract actions from the slice

// Utility function to show error messages
const showError = (messageText) => {
  message.error(messageText, 3); // Display error message for 3 seconds
};

// Async action to fetch articles from The News API
export const searchArcticlesFromNewsApiAction =
  (query, page, setIsLoading, onSuccess) => async (dispatch) => {
    try {
      // Make API call to fetch articles based on query and filter parameters
      const response = await requests.searchArcticlesFromNewsApi(query, page);

      // Extract articles from the response
      const articles = response?.data?.articles;

      // Dispatch action to update Redux state with transformed article data
      dispatch(
        actions.setData({
          data:
            articles?.length > 0
              ? articles?.map((v) => ({
                  // Transform the API response to match the application's data model
                  thumbnail: v.urlToImage, // Add thumbnail if available
                  abstract: v.description, // Summary of the article
                  date: v.publishedAt, // Publication date
                  section: v.source?.name, // Section name of the article
                  url: v.url, // Link to the full article
                  title: v.title, // Main headline of the article
                }))
              : [], // If no articles are returned, set an empty array
          totalRecords: response.data?.totalResults,
        })
      );

      // Call the success callback if provided
      onSuccess && onSuccess();
    } catch (error) {
      console.log("Error ===>", error); // Log the error for debugging

      // Handle specific error cases
      if (error?.status == 426 || error?.status == 429) {
        // Show error message for quota limit exceeded
        showError("Quota limit exceeded. Please try again later.");
      }
    } finally {
      // Ensure that loading state is updated, regardless of success or failure
      setIsLoading && setIsLoading(false);
    }
  };

// Async action to fetch sections list from The News API

export const getSourcesListFromNewsApiAction = () => async (dispatch) => {
  try {
    const response = await requests.getSourcesListFromNewsApi();
    dispatch(actions.setSourcesData(response.data?.sources));
  } catch (error) {
    console.log("Error ==>", error);
  }
};
