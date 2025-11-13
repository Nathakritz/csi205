import React from "react";
import Adder from "../components/Adder";
import Counter from "../components/Counter";
import Timer from "../components/Timer";
import Temperatures from "../components/Temperatures";

export default function PageComponent() {
  return (
    <div className="p-6  from-sky-50 to-blue-100 rounded-2xl shadow-xl min-h-[80vh]">
      {/* Header Section */}
      <h1 className="text-2xl md:text-3xl font-semibold text-center text-gray-700 mb-8">
        ⚙️ React Interactive Components Dashboard
      </h1>

      {/* Row 1: Adder, Timer, Counter */}
      <div className="flex flex-wrap justify-center gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-md w-72 hover:shadow-lg transition">
          <Adder />
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md w-72 hover:shadow-lg transition">
          <Timer />
        </div>
        <div className="bg-white p-5 rounded-xl shadow-md w-72 hover:shadow-lg transition">
          <Counter />
        </div>
      </div>

      {/* Row 2: Temperatures */}
      <div className="flex justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md w-[90%] md:w-[70%] hover:shadow-lg transition">
          <Temperatures />
        </div>
      </div>

      {/* Footer Section */}
      <div className="text-center mt-10 text-gray-500 text-sm">
        © 2025 SPU | Front-End Development Lab
      </div>
    </div>
  );
}
