import { useCallback } from "react";


export default function useCategoryApi() {
    const getAllCategories = useCallback(async () => {
        const response = await fetch('/api/categories/list', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('Categories fetched successfully');

            const data = await response.json();
            return data;;
        } else {
            console.error('Failed to fetch categories');
        }
    }, []);

    return { getAllCategories };
}