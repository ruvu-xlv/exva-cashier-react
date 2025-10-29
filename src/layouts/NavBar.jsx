export default function NavBar() {
    return (
        <div className="navbar bg-green-500 text-white fixed top-0 left-0 w-full shadow-md z-50 rounded-b-3xl">
            <div className="flex-1">
                <a href="/dashboard" className="text-2xl font-bold text-white tracking-wide hover:text-green-200 transition-colors">
                    EXVA
                </a>
            </div>

            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="user avatar"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-green-100 text-green-900 rounded-box z-10 mt-3 w-52 p-2 shadow-md border border-green-400"
                    >
                        <li>
                            <a className="justify-between hover:bg-green-200 hover:text-green-950 transition-colors">
                                Profile
                                <span className="badge bg-green-500 border-none text-white">New</span>
                            </a>
                        </li>
                        <li>
                            <a className="hover:bg-green-200 hover:text-green-950 transition-colors">Settings</a>
                        </li>
                        <li>
                            <a className="hover:bg-green-200 hover:text-green-950 transition-colors">Logout</a>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    );
}
