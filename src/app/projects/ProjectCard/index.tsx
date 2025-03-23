import Image from "next/image";
interface Projects {
  id: string;
  name: string;
  location: { name: string, lng: number, lat: number };
  orders: number;
  orderedDate?: string;
  images: string[];
  maps: number;
  panos?: number;
  virtualTours?: number;
  videos: string[];
}
const ProjectCard = ({ project, isSelected }: { project: Projects, isSelected: boolean }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-4 h-full overflow-hidden  max-h-[300px] h-auto bg-white border shadow-md
    ${isSelected ? "border-blue-500 bg-blue-100" : "border-gray-300"
      }
    `}>
      <div className="flex justify-between gap-4">
        <div>
          <div>
            <h3 className="text-lg font-semibold mt-3">{project.name}</h3>
            <p className="text-gray-500 text-sm">{project.location.name}</p>
          </div>
          <div>
            <div className="bg-gray-100 px-2 py-1 my-2 mr-2 inline-block rounded-[8px]">
              <p className="text-gray-500 text-sm">Orders: {project.orders}</p>
            </div>

            <div className="bg-gray-100 px-2 py-1 mb-2 mr-2 inline-block rounded-[8px]">
              <p className="text-gray-500 text-sm">Last Order: 10/01/2023</p>
            </div>
          </div>
        </div>
        <div className="h-32 rounded-lg overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.name}
            width={100}
            height={100}
            className="object-cover w-full h-full rounded-[8px]"
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t pt-2 border-gray-300">
        <div className="bg-gray-100 px-2 py-1 rounded-lg inline-flex items-center">
        <span className="bg-white w-6 h-6 flex items-center justify-center rounded-[50px] text-sm font-semibold mr-2">
        {project.maps} </span>Maps</div>
        <div className="bg-gray-100 px-2 py-1 rounded-lg inline-flex items-center">
        <span className="bg-white w-6 h-6 flex items-center justify-center rounded-[50px] text-sm font-semibold mr-2">
        {project.images.length}</span>Images</div>
        <div className="bg-gray-100 px-2 py-1 rounded-lg inline-flex items-center">
        <span className="bg-white w-6 h-6 flex items-center justify-center rounded-[50px] text-sm font-semibold mr-2">
        {project.panos} </span>Panos</div>
        <div className="bg-gray-100 px-2 py-1 rounded-lg inline-flex items-center whitespace-nowrap">
        <span className="bg-white w-6 h-6 flex items-center justify-center rounded-[50px] text-sm font-semibold mr-2">
        {project.virtualTours} </span>Virtual Tours</div>
        <div className="bg-gray-100 px-2 py-1 rounded-lg inline-flex items-center">
        <span className="bg-white w-6 h-6 flex items-center justify-center rounded-[50px] text-sm font-semibold mr-2">
        {project.videos.length} </span>Videos</div>
      </div>
    </div>
  );
};

export default ProjectCard;
