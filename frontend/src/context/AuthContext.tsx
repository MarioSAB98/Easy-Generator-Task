import { createContext, useContext, useState } from "react";

interface AuthProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
}

const AuthContext = createContext<AuthProps>({
  isAuthenticated: false,
  setIsAuthenticated: () => { },
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
