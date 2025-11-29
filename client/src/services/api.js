import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3010";

export const fetchCompanies = async (webhook, limit = 10000) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/companies`, {
      webhook,
      limit,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data.message ||
          error.response.data.error ||
          "Server error"
      );
    } else if (error.request) {
      throw new Error(
        "Failed to connect to the server. Make sure the server is running."
      );
    } else {
      throw new Error(error.message || "Unknown Error");
    }
  }
};
