import { useCallback } from "react";


export default function useBookmarkApi(){
    const getAllBookmark = useCallback(async () => {
        const response = await fetch('/api/bookmarks/list', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('Bookmarks fetched successfully');

            const data = await response.json();
            return data;;
        } else {
            console.error('Failed to log in');
        }
    }, []);

    return { getAllBookmark };
}