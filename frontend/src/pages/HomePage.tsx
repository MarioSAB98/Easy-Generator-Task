import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { logout as logoutApi } from "../services/auth";
import { useAuth } from "../context/AuthContext";

type User = {
  _id: string;
  email: string;
  name: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const nav = useNavigate();
  const { setIsAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/homepage`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          nav("/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        nav("/login");
      }
    };

    fetchUser();
  }, []);

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading...</div>;

  const logout = async () => {
    try {
      await logoutApi();
      setIsAuthenticated(false);
      nav("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50 font-sans">
      <Navbar logout={logout} />

      <main className="flex-1 p-10 flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl w-full text-center border border-gray-100">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 text-orange-500 text-4xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Welcome to the application, {user.name}!
          </h1>
          <p className="text-gray-500 text-lg mb-8">
            We're glad to see you again.
          </p>

          <div className="bg-gray-50 rounded-2xl p-6 inline-block text-left w-full">
            <p className="text-sm text-gray-400 uppercase tracking-wider font-semibold mb-1">Account Details</p>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-gray-900 font-medium">{user.email}</p>
                <p className="text-xs text-gray-400">Primary Email</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
