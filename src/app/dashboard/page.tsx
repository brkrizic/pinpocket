"use client";

import BookmarkList from "@/app/dashboard/projects/BookmarkList";
import CategoryList from "@/app/dashboard/projects/CategoryList";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import useBookmarkApi from "@/hook/useBookmarkApi";
import useCategoryApi from "@/hook/useCategoryApi";
import { Bookmark, Category } from "@/types/types";
import { get } from "http";
import { useCallback, useEffect, useState } from "react";

export default function DashboardPage() {


    return (
        //<div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
        <>
        <main>
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Welcome to Your Dashboard</h2>
        </main>
        </>
        //</div>
    );
}