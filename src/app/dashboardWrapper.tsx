import React from "react";
import Navbar from "./(components)/Navbar";
import Search from "./(components)/Search";


const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    
    return (
        <div className="flex min-h-screen w-full bg-gray-50 ">
            <main className="flex w-full flex-col bg-gray-50">
                <div
                    className='bg-white overflow-hidden rounded-b-[20px] border-b border-gray-200 shadow z-[100] relative'
                >
                    <Navbar />
                    <Search />
                </div>
                {children}
            </main>
        </div>
    )
}

export default DashboardWrapper;