"use client";
export const dynamic = "force-dynamic";
import React, { Suspense } from 'react'
import ProjectCard from './ProjectCard';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useProjectStore } from '@/store/projectStore';

const ProjectPage = () => {
    const { projects,search, loading } = useProjectStore();


    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(search.toLowerCase())
    );
    const searchParams = useSearchParams();
    const selectedProject = searchParams.get("selected") || "No project selected";

    return (
        <div className='bg-gray-100 min-h-screen
        px-10 py-10
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6
        '>
            
                {loading ? (
                    <p className="text-gray-600 text-center col-span-full">Loading...</p>
                ) : filteredProjects.length > 0 ? (
                    filteredProjects.map((project) => (
                        <Link key={project.id} href={`/projects/${project.id}`}>
                            <ProjectCard project={project} isSelected={project.id === selectedProject} />
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-600 text-center col-span-full">No projects found.</p>
                )}
            
        </div>
    )
};

export default ProjectPage;