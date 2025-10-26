import api from "@/lib/api";
import { useCallback } from "react";

export default function useBookmarkApi() {
  // Fetch all bookmarks
  const getAllBookmark = useCallback(async () => {
    try {
      const response = await api.get("/bookmarks/list"); // Axios automatically uses GET
      console.log("Bookmarks fetched successfully:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching bookmarks:", error.response?.data || error.message);
      return null;
    }
  }, []);

  // Create a new bookmark
  const createBookmark = useCallback(
    async (bookmarkData: { title: string; url: string }) => {
      try {
        const response = await api.post("/bookmarks/create", bookmarkData); // Axios auto handles JSON
        console.log("Bookmark created successfully:", response.data);
        return response.data;
      } catch (error: any) {
        console.error("Error creating bookmark:", error.response?.data || error.message);
        return null;
      }
    },
    []
  );

  return { getAllBookmark, createBookmark };
}
