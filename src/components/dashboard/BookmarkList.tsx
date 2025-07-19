import { Bookmark } from "@/types/types";

interface BookmarkListProps {
    bookmarkList: Bookmark[];
}

export default function BookmarkList({ bookmarkList }: BookmarkListProps) {
    if (!bookmarkList || bookmarkList.length === 0) {
        return <p className="text-gray-500">No bookmarks available.</p>;
    }

    return (
        <div className="space-y-4">
            {bookmarkList.map((bookmark, index) => (
                <div
                    key={index}  // Prefer unique ID
                    className="bg-white rounded-xl shadow hover:shadow-md transition p-4 border border-gray-200"
                >
                    <h3 className="text-lg font-semibold text-gray-800">
                        {bookmark.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                        {bookmark.description}
                    </p>

                    {bookmark.url && (
                        <a
                            href={bookmark.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm"
                        >
                            Visit Link →
                        </a>
                    )}

                    {/* Optional: Display createdAt date */}
                    {bookmark.createdAt && (
                        <p className="text-xs text-gray-400 mt-2">
                            Added on: {new Date(bookmark.createdAt).toLocaleDateString()}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
