import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import api from "../utils/axios";

// Updated User interface to include `name`
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const loggedInUser: User = res.data.user;
      const token = res.data.token;

      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      localStorage.setItem("token", token);
    } catch (err: any) {
      console.error("🔴 Login error:", err.response?.data || err.message);
      throw err;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await api.post("/api/auth/register", {
        name,
        email,
        password,
      });

      // Optional: Automatically login after registration
      // const newUser: User = res.data.user;
      // const token = res.data.token;
      // setUser(newUser);
      // localStorage.setItem("user", JSON.stringify(newUser));
      // localStorage.setItem("token", token);
    } catch (err: any) {
      console.error("🔴 Register error:", err.response?.data || err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
