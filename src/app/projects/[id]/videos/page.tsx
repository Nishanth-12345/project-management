"use client";
import { useProjectStore } from "@/store/projectStore";
import { useParams } from "next/navigation";

export default function ProjectVideosPage() {
  const { projects } = useProjectStore();
    
  const { id } = useParams();
 
  const projectId = projects.find((item) => item.id === id);



  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Videos Section</h2>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {projectId &&projectId.videos.map((url, index) => (
         <div className="" key={index}>
          <video key={index} src={url}  className="w-full h-40 object-cover rounded-md border" />
          </div>
        ))}
      </div>
    </div>
  );
}
