"use client";

import { useGroups } from "@/hook/useGroups";
import { IGroup } from "@/models/Group";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function GroupPage() {
    const { groups, loading, error } = useGroups();

    if (loading) return <p>Loading groups...</p>;
    if (error) return <p>Error loading groups: {error.message}</p>;

    return (
        <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Groups</h2>
        <div className="flex justify-end mb-4 gap-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            + New Group
            </button>
        </div>
        <ul className="space-y-4">
            {groups.map((group: IGroup) => (
            <li
                key={group.id}
                className="p-4 rounded-2xl shadow hover:shadow-lg transition bg-white border"
            >
                <Link href={`/dashboard/groups/${group.id}`} className="hover:underline">
                <h3 className="text-xl font-semibold">{group.name}</h3>
                <p className="text-sm text-gray-500">Members: {group.members.length}</p>
                <p className="text-sm text-gray-500">Projects: {group.projects.length}</p>
                <p className="text-sm text-gray-400">{group.description}</p>
                </Link>
            </li>
            ))}
        </ul>
        </div>
    );
}
