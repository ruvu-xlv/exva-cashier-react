import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-300 via-green-200 to-green-100">
      <NavBar />

      {/* Konten utama */}
      <main className="flex-grow pt-23 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <Outlet />
      </main>

      {/* Footer opsional */}
      {/* <Footer /> */}
    </div>
  );
}
