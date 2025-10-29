import useTitle from "../hooks/useTitle";
import { useState } from "react";
import axios from "axios";
import {  } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  useTitle("Dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-2xl text-black font-bold">Halaman Dashboard</h1>
    </div>
  );
}
