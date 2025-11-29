import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { login } from "../services/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.jpg";

export default function Login() {
  const nav = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form);
      setIsAuthenticated(true);
      nav("/home");
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Easy Generator" className="w-16 h-16 rounded-full mb-4 shadow-sm" />
          <h2 className="text-3xl font-extrabold text-gray-800">Welcome Back</h2>
          <p className="text-gray-500 mt-2">Please enter your details to sign in.</p>
        </div>

        {serverError && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm">
            <p className="font-bold">Error</p>
            <p>{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button text="Login" type="submit" />
        </form>

        <p className="mt-8 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-orange-500 font-bold hover:text-orange-600 hover:underline transition-colors">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}