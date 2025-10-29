import api from "@/lib/api";
import { useCallback } from "react";

// Define the shape of a bookmark
export interface Bookmark {
  _id: string;
  title: string;
  url: string;
  userId?: string; // optional if returned from backend
}

// Optional: API response shape
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export default function useBookmarkApi() {
  // Fetch all bookmarks
  const getAllBookmark = useCallback(async (): Promise<Bookmark[] | null> => {
    try {
      const response = await api.get<ApiResponse<Bookmark[]>>("/bookmarks/list");
      console.log("Bookmarks fetched successfully:", response.data);
      return response.data.data || null;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching bookmarks:", error.message);
      } else {
        console.error("Unknown error fetching bookmarks");
      }
      return null;
    }
  }, []);

  // Create a new bookmark
  const createBookmark = useCallback(
    async (bookmarkData: { title: string; url: string }): Promise<Bookmark | null> => {
      try {
        const response = await api.post<ApiResponse<Bookmark>>("/bookmarks/create", bookmarkData);
        console.log("Bookmark created successfully:", response.data);
        return response.data.data || null;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error creating bookmark:", error.message);
        } else {
          console.error("Unknown error creating bookmark");
        }
        return null;
      }
    },
    []
  );

  return { getAllBookmark, createBookmark };
}
