import { useState } from "react";
import API from "../services/api";

export default function Register(){
  const [full_name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async()=>{
    try{
      await API.post("/register",{
        full_name,
        email,
        password
      });

      alert("Registered Successfully");
      window.location.href="/";
    }catch{
      alert("Registration failed");
    }
  };

  return(
    <div className="min-h-screen bg-sky-50 flex justify-center items-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-[420px]">
        <h2 className="text-3xl font-bold text-center text-sky-700 mb-6">
          Register
        </h2>

        <input
          placeholder="Full Name"
          className="w-full border p-3 rounded-xl mb-4"
          onChange={(e)=>setName(e.target.value)}
        />

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
          onClick={handleRegister}
          className="w-full bg-sky-600 text-white py-3 rounded-xl"
        >
          Register
        </button>
      </div>
    </div>
  )
}