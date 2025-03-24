"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/store";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const Signup = () => {
  const router = useRouter();
  const { registerUser, loading, setLoading } = useAuthStore();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      await registerUser(form.name, form.email, form.password);
      router.push("/"); 
    } catch (err) {
      console.log(err);
      setError("Signup failed. Please try again.");
    }
  }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            router.push("/");
          } else {
            setLoading(false);
          }
        });
      }, [router, setLoading]);
    

      return (
        <div className="flex items-center justify-center bg-gray-100 px-4">
          <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up</h2>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <form className="space-y-4" onSubmit={handleSignup}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span> : "Sign Up"}
              </button>
            </form>
    
            <p className="text-center text-gray-600 text-sm mt-4">
              Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
            </p>
          </div>
        </div>
      );
};

export default Signup;
