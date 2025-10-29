import NavBar from "./NavBar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-green-100 to-green-200">
            <NavBar />

            {/* konten langsung tanpa card */}
            <main className="flex-grow pt-20 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}