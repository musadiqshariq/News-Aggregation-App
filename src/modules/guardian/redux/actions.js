import * as requests from "./requests"; // API request functions
import { GuardianSlice } from "./slice"; // Redux slice for managing Guardian data

const { actions } = GuardianSlice; // Extract actions from the slice

// Async action to fetch articles from The Guardian API
export const searchArcticlesTheGuardianAction =
  (query, filterQuery, setIsLoading, onSuccess) => async (dispatch) => {
    try {
      // Make API call to fetch articles based on query and filter parameters
      const response = await requests.searchArcticlesTheGuardian(
        query,
        filterQuery
      );

      // Extract articles from the response
      const articles = response?.data?.response?.results;

      // Dispatch action to update Redux state with transformed article data
      dispatch(
        actions.setData(
          articles?.length > 0
            ? articles?.map((v) => ({
                // Transform the API response to match the application's data model
                thumbnail: v.fields?.thumbnail, // thumbnail of the article
                abstract: v.fields?.bodyText, // Summary of the article
                date: v.webPublicationDate, // Publication date
                section: v.sectionName, // Section name of the article
                sectionId: v.sectionId, // Section id of the article
                url: v.webUrl, // Link to the full article
                title: v.fields?.headline, // Main headline of the article
              }))
            : [] // If no articles are returned, set an empty array
        )
      );

      // Call the success callback if provided
      onSuccess && onSuccess();
    } catch (error) {
      console.log("Error ===>", error); // Log the error for debugging
    } finally {
      // Ensure that loading state is updated, regardless of success or failure
      setIsLoading && setIsLoading(false);
    }
  };
