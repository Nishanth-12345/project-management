"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useAuthStore } from "@/store/store";
import searchIcon from "../../../../public/search.svg";
import dashboardIcon from "../../../../public/dashboard-icon.svg";
import logo from "../../../../public/Yelloskye-logo.png";
import closeIcon from "../../../../public/close-icon.svg";
import menu from "../../../../public/menu-icon.svg";
import settings from "../../../../public/dot.svg";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { logout, userData } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsHovered(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  return (
    <>
      <nav className="bg-black px-6 py-3 rounded-b-[20px] shadow-md flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={120} height={40} />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavItem href="/" icon={dashboardIcon} label="CEO Dashboard" />
          <NavItem href="/search" icon={searchIcon} label="ALL Media" />
          <NavLink href="/">Projects</NavLink>
          <NavLink href="/maps">Maps</NavLink>
          <NavLink href="/charts">Charts</NavLink>
        </div>

        <div className="flex items-center gap-4">
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
          >
            <Image src={settings} alt="settings" width={20} height={20} className="cursor-pointer" />

        
            {isHovered && (
              <div className="details absolute right-0 top-full mt-2 w-40 bg-gray-800 text-white p-3 rounded-lg shadow-lg">
                <p className="text-white">{userData?.name}</p>

                {userData ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-white px-4 py-1 bg-red-500 rounded-lg hover:bg-red-600 transition mt-2"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="block text-center text-white px-4 py-1 bg-blue-500 rounded-lg hover:bg-blue-600 transition mt-2"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white md:hidden"
          >
            <Image src={menu} alt="menu" width={20} height={20} ></Image>
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-900 text-white transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:hidden shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setSidebarOpen(false)}>
            <Image src={closeIcon} alt="close" width={20} height={20} ></Image>
          </button>
        </div>

        <div className="flex flex-col gap-4 p-4">
          <NavItem href="/" icon={dashboardIcon} label="CEO Dashboard" sidebar />
          <NavItem href="/search" icon={searchIcon} label="ALL Media" sidebar />
          <NavLink href="/" sidebar>Projects</NavLink>
          <NavLink href="/maps" sidebar>Maps</NavLink>
          <NavLink href="/charts" sidebar>Charts</NavLink>
        </div>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

const NavItem = ({
  href,
  icon,
  label,
  sidebar = false,
}: {
  href: string;
  icon: StaticImageData;
  label: string;
  sidebar?: boolean;
}) => (
  <Link
    href={href}
    className={`flex items-center gap-2 ${sidebar ? "text-white hover:bg-gray-800 p-2 rounded-lg" : "text-white hover:text-blue-400 transition"
      }`}
  >
    <Image src={icon} alt={label} width={18} height={18} />
    <span>{label}</span>
  </Link>
);


const NavLink = ({
  href,
  children,
  sidebar = false,
}: {
  href: string;
  children: React.ReactNode;
  sidebar?: boolean;
}) => (
  <Link
    href={href}
    className={`${sidebar ? "text-white hover:bg-gray-800 p-2 rounded-lg" : "text-white hover:text-blue-400 transition"
      }`}
  >
    {children}
  </Link>
);

export default Navbar;
