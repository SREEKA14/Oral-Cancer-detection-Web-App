import { useState } from "react";
import API from "../services/api";
import { saveToken } from "../utils/auth";

export default function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {
    try{
      const res = await API.post("/login", {
        email,
        password
      });

      saveToken(res.data.token);
      window.location.href="/dashboard";
    }catch(err){
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[420px]">
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
          Login
        </h2>

        <input
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-sky-600 text-white py-3 rounded-xl"
        >
          Login
        </button>

        <div className="mt-5 text-center space-y-2">
          <a href="/register" className="block text-sky-600">
            Create Account
          </a>

          <a href="/forgot" className="block text-gray-500">
            Forgot Password
          </a>
        </div>
      </div>
    </div>
  );
}