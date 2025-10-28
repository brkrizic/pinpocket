"use client";

import { useGroups } from "@/hook/useGroups";
import ProjectList from "@/app/dashboard/projects/ProjectList";
import TaskList from "@/app/dashboard/projects/TaskList";
import { useEffect, useState } from "react";
import { ITask } from "@/models/Task";
import { IProject } from "@/models/Project";



export default function ProjectsPage(){
    const { groups, loading, error } = useGroups();


    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [tasks, setTasks] = useState<ITask[]>([]);

    // Flatten all projects from all groups into a single array
    const allProjects = groups.flatMap((group: any) => group.projects || []);

    useEffect(() => {
        const project = allProjects.find((p: IProject) => p.id === selectedProject);
        setTasks(project ? project.tasks : []);
    }, [allProjects, selectedProject]);
    
    if (loading) return <p>Loading groups...</p>;
    if (error) return <p>Error loading groups: {error.message}</p>;


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
                        <ProjectList projectList={allProjects} setSelectedProject={setSelectedProject} selectedProject={selectedProject}/>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
                        <h3 className="font-semibold text-xl mb-3">Tasks</h3>
                        <TaskList taskList={tasks} />
                    </div>
                </div>
            </div>
            </>
        //</div>
    );
}