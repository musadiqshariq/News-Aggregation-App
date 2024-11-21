import axios from "axios"; // Import Axios for making HTTP requests

// Define the API key for authenticating requests to The New York Times API
const apiKey = `qUn6WPI1AeanymlZGGAY3OZACj70okUC`;

// Function to search articles from The New York Times
export const searchArcticlesFromNewYorkTimes = (query, filterQuery) => {
  // Construct the API endpoint URL
  return axios.get(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${apiKey}&q=${query}${filterQuery}`
  );
};

// Function to get section list from The New York Times
export const getSectionListFromNewYorkTimes = () => {
  // Construct the API endpoint URL
  return axios.get(
    `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${apiKey}`
  );
};
