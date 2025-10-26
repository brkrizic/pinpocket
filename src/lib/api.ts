import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // this allows sending refresh token cookie
});

// ---- Interceptor ----
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try refreshing token
        await fetch("/api/auth/refresh", { method: "POST" });

        // Retry the failed request with new access token
        return api(originalRequest);
      } catch (err) {
        console.error("Token refresh failed:", err);
        // Optionally redirect to login page
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
