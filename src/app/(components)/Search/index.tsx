"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowLeftIcon from "../../../../public/arrow-left.svg";
import plusIcon from "../../../../public/plus.svg";
import searchIcon from "../../../../public/search-icon.svg"
import { useProjectStore } from "@/store/projectStore";

const Search = () => {
  const { search, setSearch } = useProjectStore();

  
  return (
    <div className="flex flex-wrap rounded-[25px] items-center w-full px-4 py-4 bg-white gap-4 md:gap-6 lg:gap-8">
  
      <Link
        href={"/"}
        className="flex items-center gap-2 px-4 py-2 secondary-bg primary-color text-white rounded-full hover:bg-blue-600 transition"
      >
        <Image src={ArrowLeftIcon} width={16} height={16} alt="Back" className="w-5 h-5" />
        <span className="font-medium">All Projects</span>
      </Link>

   
      <div className="flex items-center px-4 py-2 border border-gray-400 rounded-full flex-grow">
        <input
          type="text"
          className="bg-transparent outline-none px-2 w-full"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Image src={searchIcon} alt="Search" className="w-4 h-4 search" />
      </div>

    
      <button className="flex items-center gap-2 px-6 py-2 secondary-bg text-white rounded-full hover:bg-blue-600 transition">
        <span className="text-sm primary-color">A-Z</span>
        <span className="font-medium primary-color">Sort</span>
      </button>

    
     
        <Link href={'/addProject'} className="flex items-center gap-2 px-4 py-2 primary-bg text-white rounded-full hover:bg-blue-600 transition">
          <Image src={plusIcon} alt="Add Folder" className="w-5 h-5" />
          <span className="font-medium">Add Project</span>
        </Link>

        <button className="flex items-center gap-2 px-4 py-2 primary-bg text-white rounded-full hover:bg-blue-600 transition">
          <Image src={plusIcon} alt="Add Folder" className="w-5 h-5" />
          <span className="font-medium text-sm">All Folders</span>
        </button>
      
    </div>
  );
};

export default Search;
