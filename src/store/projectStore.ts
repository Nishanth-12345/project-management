import { create } from "zustand";
import { db } from "@/lib/firebaseConfig";
import { collection, doc, setDoc, serverTimestamp, query, getDocs, Timestamp } from "firebase/firestore";
import axios from "axios";
import { useAuthStore } from "@/store/store";
import { cloudName, uploadPreset } from "@/lib/presets";

interface Project {
    id: string;
    name: string;
    location: { name: string; lat: number; lng: number };
    orders: number;
    orderedDate?: string;
    images: string[];
    videos: string[];
    maps: number;
    panos?: number;
    virtualTours?: number;
    documentId?: string;
    uid?: string;
    timeStamp?: Timestamp;
}

interface ProjectStore {
    projects: Project[];
    loading: boolean;
    addProject: (projectData: Omit<Project, "id" | "documentId" | "timeStamp">) => Promise<void>;
    uploadFileToCloudinary: (file: File, type: "image" | "video") => Promise<string>;
    fetchProjects:()=>Promise<void>;
    search: string;
    setSearch: (search: string) => void;
}

export const useProjectStore = create<ProjectStore>((set) => {

    const collectionsRef = collection(db, "projects");
    

    // Upload file to Cloudinary
    const uploadFileToCloudinary = async (file: File): Promise<string> => {
        set({ loading: true });
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
            formData
        );
        console.log("upload", response.data)
        set({ loading: false });
        return response.data.secure_url;
    };
    const fetchProjects = async () => {
        try {
          set({ loading: true });
          const q = query(collection(db, "projects"));
          const querySnapshot = await getDocs(q);
          const projects: Project[] = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Project[];
    
          set({ projects, loading: false });
        } catch (error) {
          console.error("Error fetching projects:", error);
          set({ loading: false });
        }
      }

    const addProject = async (projectData: Omit<Project, "id" | "documentId" | "timeStamp">) => {
        try {
            set({ loading: true });

            const projectsRef = doc(collectionsRef);
            const documentId = projectsRef.id;
            const { user } = useAuthStore.getState();
            const res = await setDoc(projectsRef, {
                name: projectData.name,
                location: projectData.location,
                orders: projectData.orders,
                orderedDate: projectData.orderedDate,
                images: projectData.images,
                videos: projectData.videos,
                maps: projectData.maps,
                panos: projectData.panos,
                virtualTours: projectData.virtualTours,
                uid: user?.uid,
                id: documentId,
                documentId,
                timeStamp: serverTimestamp(),
            });

            set((state) => ({
                projects: [...state.projects, { ...projectData, id: documentId, documentId }],
                loading: false,
            }));

            await fetchProjects();
            console.log(res, 'add');
        } catch (error) {
            console.error("Error adding project:", error);
            set({ loading: false });
        }
    };
    (async () => {
        await fetchProjects();
    })();
    return {
        projects: [],
        loading: false,
        addProject,
        uploadFileToCloudinary,
        fetchProjects,
        search: "",
        setSearch: (search) => set({ search }),
    };
});
