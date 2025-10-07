import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loginDetails, setLoginDetails] = useState(() => {
    const saved = localStorage.getItem("loginDetails");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  const authentiction = async (userName, password) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      setLoginDetails(data);
      localStorage.setItem("loginDetails", JSON.stringify(data)); // ✅ persist
      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile", {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Not logged in");

      const data = await res.json();
      console.log("Profile:", data);
      setLoginDetails(data);
      localStorage.setItem("loginDetails", JSON.stringify(data)); // ✅ persist
    } catch (error) {
      console.log("Profile fetch failed:", error.message);
      // 🧠 Don't clear local data if backend cookie check fails
      const saved = localStorage.getItem("loginDetails");
      if (saved) {
        setLoginDetails(JSON.parse(saved));
      } else {
        setLoginDetails(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }
        
        
        

      const data = await res.json();
      console.log(data.msg);
      setLoginDetails(null);
      localStorage.removeItem("loginDetails"); 
    }
    
     catch (error) {
      console.error("Logout error:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);



  return (
    <LoginContext.Provider
      value={{ loginDetails, authentiction, logout, loading }}
    >
      {children}
    </LoginContext.Provider>
  );
};
