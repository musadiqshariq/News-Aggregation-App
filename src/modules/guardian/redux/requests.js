import axios from "axios"; // Import Axios for making HTTP requests

// Define the API key for authenticating requests to The New York Times API
const apiKey = `f1dd95e1-9c0a-48ad-ba18-2591d2522137`;

// Function to search articles from The New York Times
export const searchArcticlesTheGuardian = (query, filterQuery) => {
  // Construct the API endpoint URL
  return axios.get(
    `https://content.guardianapis.com/search?page=1&api-key=${apiKey}&page-size=50&show-fields=all${
      query ? `&q=${query}` : ""
    }${filterQuery}`
  );
};
