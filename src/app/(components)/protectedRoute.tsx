"use client";

import { useEffect } from "react";
import { useAuthStore } from "../../store/store";
import { usePathname, useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    console.log(user,'user')
    if (loading) return;

    if (!user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }
  }, [user, loading, pathname, router]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;


  return <>{children}</>;
};

export default ProtectedRoute;
