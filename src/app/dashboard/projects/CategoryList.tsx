import { Category } from "@/types/types";

interface CategoryListProps {
    categoryList: Category[];
}

export default function CategoryList({ categoryList }: CategoryListProps) {
    if (!categoryList || categoryList.length === 0) {
        return <p className="text-gray-500">No categories available.</p>;
    }

    return (
        <ul className="space-y-3">
            {categoryList.map((category, index) => (
                <li
                    key={index}  // assuming MongoDB _id, replace if needed
                    className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition rounded-lg px-4 py-2"
                >
                    <span className="font-medium text-gray-800">{category.name}</span>
                    {/* Optional: Actions (Edit/Delete) */}
                    {/* <button className="text-sm text-blue-600 hover:underline">Edit</button> */}
                </li>
            ))}
        </ul>
    );
}
