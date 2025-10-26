"use client";

import BookmarkList from "@/app/dashboard/projects/BookmarkList";
import CategoryList from "@/app/dashboard/projects/CategoryList";
import useBookmarkApi from "@/hook/useBookmarkApi";
import useCategoryApi from "@/hook/useCategoryApi";
import { Bookmark, Category } from "@/types/types";
import { useEffect, useState } from "react";


export default function ProjectsPage(){
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [bookmarkList, setBookmarkList] = useState<Bookmark[]>([]);

    const { getAllBookmark } = useBookmarkApi();
    const { getAllCategories } = useCategoryApi();

    useEffect(() => {
        const fetch = async () => {
            const [resultCategory, resultBookmark] = await Promise.all([
                getAllCategories(),
                getAllBookmark()
            ])
            setBookmarkList(resultBookmark.data);
            setCategoryList(resultCategory.data);
        }

        fetch();
    }, []);

    return (
        //<div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        <>

            <div>
                <h2 className="text-3xl font-bold mb-6 border-b pb-2">Projects</h2>
                <div className="flex justify-end mb-4 gap-2">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        + New Task
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                        + New Project
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-2xl shadow p-4">
                        <h3 className="font-semibold text-xl mb-3">Projects</h3>
                        <CategoryList categoryList={categoryList} />
                    </div>

                    <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
                        <h3 className="font-semibold text-xl mb-3">Tasks</h3>
                        <BookmarkList bookmarkList={bookmarkList} />
                    </div>
                </div>
            </div>
            </>
        //</div>
    );
}