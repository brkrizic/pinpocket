import { ITask } from "@/models/Task";

interface taskListProps {
    taskList: ITask[];
}

export default function TaskList({ taskList }: taskListProps) {
    if (!taskList || taskList.length === 0) {
        return <p className="text-gray-500">No tasks available.</p>;
    }

    return (
        <div className="space-y-4 h-[500px] overflow-y-auto">
            {taskList.map((task, index) => (
                <div
                    key={index}  // Prefer unique ID
                    className="bg-white rounded-xl shadow hover:shadow-md transition p-4 border border-gray-200"
                >
                    <h3 className="text-lg font-semibold text-gray-800">
                        {task.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                        {task.description}
                    </p>

                    {/* Optional: Display createdAt date */}
                    {task.createdAt && (
                        <p className="text-xs text-gray-400 mt-2">
                            Added on: {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
