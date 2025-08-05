import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await loginUser(form);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert(`Login failed. Please check your credentials. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[50%] flex flex-col gap-5">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="text-lg font-semibold">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label className="text-lg font-semibold">Password</label>
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button
          type="submit"
          className={`p-2 rounded text-white transition-colors ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="text-sm text-gray-500">
        Don't have an account?{" "}
        <a href="/register" className="text-blue-500 hover:underline">
          Register
        </a>
      </p>
    </div>
  );
}

export default Login;
