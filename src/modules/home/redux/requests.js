import axios from "axios"; // Import Axios for making HTTP requests

// Define the API key for authenticating requests to The News Api API
const apiKey = `02b99303b7de4cd797445c5f2efb309f`;

// Function to search articles from The News Api
export const searchArcticlesFromNewsApi = (query, page) => {
  // Construct the API endpoint URL
  return query
    ? axios.get(
        `https://newsapi.org/v2/everything?apiKey=${apiKey}&pageSize=50&page=${page}${query}`
      )
    : axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&pageSize=50`
      );
};

// Function to get sources list from The News Api
export const getSourcesListFromNewsApi = () => {
  // Construct the API endpoint URL
  return axios.get(
    `https://newsapi.org/v2/top-headlines/sources?apiKey=${apiKey}`
  );
};
