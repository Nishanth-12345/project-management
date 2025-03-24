import { Suspense } from "react";
import ProjectPage from "./projects/page";

export default function Home() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectPage />
    </Suspense>
  );
}
