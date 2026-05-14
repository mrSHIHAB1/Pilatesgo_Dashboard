import { Outlet } from "react-router";

export default function Root() {
  return (
    <>
      <p>Dashboard</p>
      <main className="min-h-[calc(100vh-120px)]">
        <Outlet />
      </main>
     
    </>
  );
}
