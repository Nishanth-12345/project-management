"use client";

import { useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../(components)/protectedRoute";


const ProjectAddPage = () => {
    const { addProject, uploadFileToCloudinary, loading } = useProjectStore();
    const [name, setName] = useState("");
    const [location, setLocation] = useState({ name: "", lat: 0, lng: 0 });
    const orders = 2;
    const maps = 1;
    const panos = 5;
    const virtualTours  = 5;
    const [images, setImages] = useState<File[]>([]);
    const [videos, setVideos] = useState<File[]>([]);
    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, type: "image" | "video") => {
        const files = event.target.files;
        if (files) {
            if (type === "image") setImages(Array.from(files));
            else if (type === "video") setVideos(Array.from(files));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !location.name) return alert("Please fill in all required fields.");

        try {
            const uploadedImageUrls: string[] = [];
            const uploadedVideoUrls: string[] = [];

            for (const file of images) {
                const url = await uploadFileToCloudinary(file, "image");
                uploadedImageUrls.push(url);
            }

            for (const file of videos) {
                const url = await uploadFileToCloudinary(file, "video");
                uploadedVideoUrls.push(url);
            }

             await addProject({
                name,
                location,
                orders,
                orderedDate: new Date().toISOString(),
                images: uploadedImageUrls,
                videos: uploadedVideoUrls,
                maps,
                panos,
                virtualTours,
            });

            router.push('/projects');
        } catch (error) {
            console.error("Error submitting project:", error);
        }
    };

    return (
        <ProtectedRoute>
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Add New Project</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Project Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-2 border rounded-md"
                        required
                    />

                    <input
                        type="text"
                        placeholder="Location Name"
                        value={location.name}
                        onChange={(e) => setLocation((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full p-2 border rounded-md"
                        required
                    />

                    <input
                        type="number"
                        placeholder="Latitude"
                        value={location.lat}
                        onChange={(e) => setLocation((prev) => ({ ...prev, lat: parseFloat(e.target.value) }))}
                        className="w-full p-2 border rounded-md"
                        required
                    />

                    <input
                        type="number"
                        placeholder="Longitude"
                        value={location.lng}
                        onChange={(e) => setLocation((prev) => ({ ...prev, lng: parseFloat(e.target.value) }))}
                        className="w-full p-2 border rounded-md"
                        required
                    />

                    <label className="block font-semibold">Upload Images:</label>
                    <label className="cursor-pointer primary-bg text-white py-2 px-4 rounded-md hover:bg-blue-600 inline-block">
                        Choose Images
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => handleFileChange(e, "image")}
                            className="hidden"
                        />
                    </label>

                    {images.length > 0 && (
                        <ul className="mt-2 text-sm text-gray-700">
                            {images.map((name, index) => (
                                <li key={index} className="truncate">{name.name}</li>
                            ))}
                        </ul>
                    )};
                    <label className="block font-semibold mt-4">Upload Videos:</label>
                    <label className="cursor-pointer bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 inline-block">
                        Choose Videos
                        <input
                            type="file"
                            multiple
                            accept="video/*"
                            onChange={(e) => handleFileChange(e, "video")}
                            className="hidden"
                        />
                    </label>
                    {videos.length > 0 && (
                        <ul className="mt-2 text-sm text-gray-700">
                            {videos.map((name, index) => (
                                <li key={index} className="truncate">{name.name}</li>
                            ))}
                        </ul>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full primary-bg text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        {loading ? "Adding..." : "Add Project"}
                    </button>
                </form>
            </div>
        </ProtectedRoute>
    );
};

export default ProjectAddPage;
