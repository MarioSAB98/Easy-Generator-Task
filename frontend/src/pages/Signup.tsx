import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { signup } from "../services/auth";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Signup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [serverError, setServerError] = useState("");

  const validate = () => {
    const newErrors: any = {};

    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (form.name.length < 3) newErrors.name = "Name must be at least 3 characters";

    if (form.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (!/[A-Za-z]/.test(form.password))
      newErrors.password = "Password must contain at least one letter";
    if (!/[0-9]/.test(form.password))
      newErrors.password = "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(form.password))
      newErrors.password = "Password must contain a special character";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await signup(form);
      nav("/login");
    } catch (err: any) {
      setServerError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <img src={logo} alt="Easy Generator" className="w-16 h-16 rounded-full mb-4 shadow-sm" />
          <h2 className="text-3xl font-extrabold text-gray-800">Create Account</h2>
          <p className="text-gray-500 mt-2">Join us and start your journey.</p>
        </div>

        {serverError && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-6 text-sm">
            <p className="font-bold">Error</p>
            <p>{serverError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input label="Email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            error={errors.email}
          />

          <Input label="Full Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            error={errors.name}
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            error={errors.password}
          />

          <Button text="Sign Up" type="submit" />
        </form>

        <p className="mt-8 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500 font-bold hover:text-orange-600 hover:underline transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}