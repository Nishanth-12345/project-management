"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useProjectStore } from "../../../store/projectStore";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const projects = useProjectStore((state) => state.projects);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return <div className="p-6 text-red-500 text-center text-xl">Project not found.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Project: {project.name}</h2>
      <div className="flex gap-4 mb-6">
        <Link href={`/projects/${id}/images`} className="primary-bg text-white px-4 py-2 rounded-lg">
          Images
        </Link>
        <Link href={`/projects/${id}/videos`} className="primary-bg text-white px-4 py-2 rounded-lg">
          Videos
        </Link>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="w-full">
            {project.images.length > 0 ? (
              <Image
                src={project.images[0]}
                alt={project.name}
                width={400}
                height={300}
                className="rounded-lg w-full h-auto object-cover"
              />
            ) : (
              <p className="text-gray-500">No images available</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold">Location:</h3>
            <p className="text-gray-600">{project.location.name}</p>

            <h3 className="text-lg font-semibold mt-3">Orders:</h3>
            <p className="text-gray-600">{project.orders}</p>

            {project.orderedDate && (
              <>
                <h3 className="text-lg font-semibold mt-3">Ordered Date:</h3>
                <p className="text-gray-600">{project.orderedDate}</p>
              </>
            )}

            <h3 className="text-lg font-semibold mt-3">Maps:</h3>
            <p className="text-gray-600">{project.maps}</p>

            {project.panos !== undefined && (
              <>
                <h3 className="text-lg font-semibold mt-3">Panos:</h3>
                <p className="text-gray-600">{project.panos}</p>
              </>
            )}

            {project.virtualTours !== undefined && (
              <>
                <h3 className="text-lg font-semibold mt-3">Virtual Tours:</h3>
                <p className="text-gray-600">{project.virtualTours}</p>
              </>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}