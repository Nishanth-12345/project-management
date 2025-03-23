"use client";
import ArrowLeftIcon from '../../../../../public/arrow-left.svg';
import check from '../../../../../public/check.svg';
import copy from '../../../../../public/copy.svg';
import uploadIcon from '../../../../../public/upload.svg';
import download from '../../../../../public/download.svg';
import Image from "next/image";
import './styles.css';
import { useProjectStore } from "@/store/projectStore";
import { useParams } from "next/navigation";


export default function ProjectImagesPage() {
    const { projects, loading } = useProjectStore();

    const { id } = useParams();

    const projectId = projects.find((item) => item.id === id);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Images Section</h2>
            <div className="bg-[#2376c5] flex items-center gap-4 w-45 rounded-[50px] text-white px-4 py-2 rounded-lg">
                <Image
                    src={uploadIcon}
                    alt="upload"
                    width={18}
                    height={18}
                />
                <p>Upload Image</p>
            </div>

            {
                loading ? <p>loading...</p> :
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {projectId && projectId.images.map((url, index) => (
                            <div className="image-wrapper" key={index}>
                                <div className="image">
                                    <Image key={index} src={url} alt="Uploaded" width={200} height={200} className="w-full h-40 object-cover rounded-md border" />
                                </div>
                                <div className="bottom py-1 px-2">
                                    <div className="name px-2 py-1">
                                        <p>image 1</p>
                                        <Image
                                            src={check}
                                            alt="tick"
                                            width={14}
                                            height={14}
                                        />
                                    </div>
                                    <Image
                                        src={copy}
                                        alt="copy"
                                        width={14}
                                        height={14}
                                    />
                                    <Image

                                        src={download}
                                        alt="download"
                                        width={14}
                                        height={14}
                                    />
                                    <Image
                                        src={ArrowLeftIcon}
                                        alt="check"
                                        width={14}
                                        height={14}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
            }
        </div>
    );
}
