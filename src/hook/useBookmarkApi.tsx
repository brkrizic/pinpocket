import { useCallback } from "react";

export default function useBookmarkApi() {
  // Fetch all bookmarks
  const getAllBookmark = useCallback(async () => {
    try {
      const response = await fetch("/api/bookmarks/list", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to fetch bookmarks");
      }

      const data = await response.json();
      console.log("Bookmarks fetched successfully:", data);
      return data;
    } catch (error: any) {
      console.error("Error fetching bookmarks:", error.message);
      return null;
    }
  }, []);

  // Create a new bookmark
  const createBookmark = useCallback(
    async (bookmarkData: { title: string; url: string }) => {
      try {
        const response = await fetch("/api/bookmarks/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookmarkData),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Failed to create bookmark");
        }

        const data = await response.json();
        console.log("Bookmark created successfully:", data);
        return data;
      } catch (error: any) {
        console.error("Error creating bookmark:", error.message);
        return null;
      }
    },
    []
  );

  return { getAllBookmark, createBookmark };
}
