"use client";

import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
interface formattedData{
  name: string;
  orders: number;
  images: number;
  videos: number;
  maps: number;
  panos: number;
  virtualTours: number;
}
const ChartsPage = () => {
  const { projects, fetchProjects, loading } = useProjectStore();
  const [chartData, setChartData] = useState<formattedData[]>([]);

  useEffect(() => {
    fetchProjects(); 
  }, [fetchProjects]);

  useEffect(() => {
    if (projects.length > 0) {
      const formattedData = projects.map((project) => ({
        name: project.name,
        orders: project.orders,
        images: project.images.length,
        videos: project.videos.length,
        maps: project.maps,
        panos: project.panos || 0,
        virtualTours: project.virtualTours || 0,
      }));

      setChartData(formattedData);
    }
  }, [projects]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-6">Project Data Trends</h1>

      <div className="w-full max-w-4xl p-4 bg-white shadow-lg rounded-lg">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#2376c5" strokeWidth={2} />
              <Line type="monotone" dataKey="maps" stroke="#9b59b6" strokeWidth={2} />
              <Line type="monotone" dataKey="panos" stroke="#e74c3c" strokeWidth={2} />
              <Line type="monotone" dataKey="virtualTours" stroke="#16a085" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default ChartsPage;
