import { IProject } from "@/models/Project";

interface ProjectListProps {
    projectList: IProject[];
    setSelectedProject: (id: string) => void;
    selectedProject: string | null; 
}

export default function ProjectList({ projectList, setSelectedProject, selectedProject }: ProjectListProps) {
    if (!projectList || projectList.length === 0) {
        return <p className="text-gray-500">No projects available.</p>;
    }

    return (
        <ul className="space-y-3 h-[500px] overflow-y-auto">
            {projectList.map((project, index) => {
                const isSelected = project.id === selectedProject;
                return (
                    <li
                        key={index}  // ideally use project.id
                        onClick={() => setSelectedProject(project.id)}
                        className={`
                            flex items-center justify-between transition rounded-lg px-4 py-2
                            ${isSelected ? "bg-green-700 text-white" : "bg-gray-100 hover:bg-gray-200"}
                        `}
                    >
                        <span className="font-medium">{project.name}</span>
                    </li>
                );
            })}
        </ul>
    );
}
