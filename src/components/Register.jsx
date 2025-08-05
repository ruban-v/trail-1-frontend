import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await registerUser(form);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
      alert(
        `Registration failed. Please check your credentials. ${error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[50%] flex flex-col gap-5">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <label className="text-lg font-semibold">Name</label>
        <input
          type="text"
          placeholder="Name"
          className="border border-gray-300 p-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label className="text-lg font-semibold">Email</label>
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 p-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <label className="text-lg font-semibold">Phone</label>
        <input
          type="phone"
          placeholder="Phone"
          className="border border-gray-300 p-2 rounded"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="text-sm text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}

export default Register;
