"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/projects");
  },[]);

  return (
    <div className="">
      <Link href={'/projects'} className="primary-color">Click here to View All Projects</Link>
    </div>
  );
}
