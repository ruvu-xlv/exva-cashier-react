import useTitle from "../hooks/useTitle";
import { useEffect, useState } from "react";
// import axios from "axios";
import api from "../services/api"
import { ShoppingCart, User, Settings, Coffee, Star, Heart } from "lucide-react";
import { href, Link } from "react-router-dom";

export default function Dashboard() {
  useTitle("Dashboard");

  const [user, setUser] = useState(null);

  const [foodSpecials] = useState([
    { id: 1, name: "Margherita Pizza", image: "https://via.placeholder.com/150", price: "$12" },
    { id: 2, name: "Chicken Burger", image: "https://via.placeholder.com/150", price: "$10" },
    { id: 3, name: "Green Salad", image: "https://via.placeholder.com/150", price: "$8" },
  ]);

  const [drinkSpecials] = useState([
    { id: 1, name: "Cappuccino", image: "https://via.placeholder.com/150", price: "$5" },
    { id: 2, name: "Mango Smoothie", image: "https://via.placeholder.com/150", price: "$6" },
    { id: 3, name: "Iced Tea", image: "https://via.placeholder.com/150", price: "$4" },
  ]);

  useEffect(() => {
    api
      .get("/auth/user")
      .then((res) => setUser(res.data.user))
      .catch((err) => console.error("Gagal memuat data user...", err));
  }, []);

  return (
    <div className="">
      {/* Welcome Card */}
      <div className="bg-gradient-to-r from-green-400 via-green-200 to-green-400 text-black rounded-box p-8 shadow-2xl mb-8 transform transition hover:scale-105">
        <h1 className="text-4xl font-extrabold mb-2 animate-fade-in-down">
          {user ? `Hello, ${user.name}!` : "Loading..."}
        </h1>
        <p className="text-black/80 text-lg">
          Welcome to EXVA Cafe! Order your favorite meals & drinks directly from here without waiting in line.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: "Order Menus",
            desc: "Select your favorite dishes and checkout instantly.",
            icon: <ShoppingCart className="w-10 h-10 text-green-600 transform transition group-hover:rotate-12" />
          },
          {
            title: "Status Your Order",
            desc: "Choose beverages to refresh yourself.",
            icon: <Heart className="w-10 h-10 text-green-600 transform transition group-hover:rotate-12" />
          },
          {
            href: "/profile",
            title: "Your Profile",
            desc: "Update account info, address, and preferences.",
            icon: <User className="w-10 h-10 text-green-600 transform transition group-hover:rotate-12" />
          },
        ].map((card, idx) => (
          <Link
            key={idx}
            to={card.href || "#"} // fallback biar ga error
            className="group bg-base-200 rounded-box p-6 shadow-lg cursor-pointer transform transition hover:scale-105 hover:shadow-2xl flex items-start gap-4"
          >
            {card.icon}
            <div>
              <h2 className="text-xl font-bold mb-1 text-white">{card.title}</h2>
              <p className="text-white/70">{card.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Food Specials */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Today's Food Specials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {foodSpecials.map(item => (
            <div key={item.id} className="bg-base-200 rounded-box overflow-hidden shadow-lg cursor-pointer transform transition hover:scale-105 hover:shadow-2xl group">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover group-hover:scale-110 transform transition duration-300" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1 text-white flex items-center gap-2">{item.name} <Star className="w-4 h-4 text-yellow-400" /></h3>
                <p className="text-white/70">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drink Specials */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Today's Drink Specials</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {drinkSpecials.map(item => (
            <div key={item.id} className="bg-base-200 rounded-box overflow-hidden shadow-lg cursor-pointer transform transition hover:scale-105 hover:shadow-2xl group">
              <img src={item.image} alt={item.name} className="w-full h-40 object-cover group-hover:scale-110 transform transition duration-300" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-1 text-white flex items-center gap-2">{item.name} <Coffee className="w-4 h-4 text-yellow-400" /></h3>
                <p className="text-white/70">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promo / Info Section */}
      <div className="bg-gradient-to-r from-green-200 via-green-400 to-green-200 text-black rounded-box p-8 shadow-2xl transform transition hover:scale-105 flex flex-col sm:flex-row items-center gap-4 mb-20">
        <div className="text-4xl animate-bounce">🎉</div>
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold mb-1">Today's Promo</h2>
          <p className="text-black/80">Enjoy 20% off all menu items before 6 PM!</p>
        </div>
      </div>
    </div>
  );
}