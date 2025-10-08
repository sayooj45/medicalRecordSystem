// import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

//   const AuthContext =createContext(null)
// export function AuthProvider  ({children}) {

  

//     const [profile,setProfile] =useState(null)
//     const [loading,setLoading] = useState(true)

//     const fetchProfile=useCallback(async ()=>{
//         setLoading(true)
//         try {
//             const response = fetch('/api/profile',{
//                 credentials:'include',
//             })
//             setProfile(response.ok? await response.json():null)
//             console.log(profile,'profile');
            
//         } catch (error) {
//             setProfile(null)
//             console.log(error);
            
//         } finally{
//             setLoading(false)
//         }
//     },[])


//     useEffect(()=>{fetchProfile()},[fetchProfile])

//     const login = useCallback(async (userName,password)=>{
        
//         try {
//             const response = await fetch('/api/login',{
//             method:'POST',
//             credentials:'include',
//             headers: { "Content-Type": "application/json" },
//             body:JSON.stringify({userName:userName,password:password})
//         })
//         console.log(response);
//         if(!response.ok) throw new Error("Invalid credentials")
            
//             await fetchProfile()
//         } catch (error) {
//             console.log(error);
            
//         }
//     },[fetchProfile])

//     const value =useMemo(()=>(
//         {
//         profile,
//         loading,
//         login,
//         isRole:profile?.userRole === 'admin'?'admin':profile?.userRole === 'patient'?'patient':profile?.userRole === 'hospital'?'hospital':null
//     }
//     ),[profile,loading,login])
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }


// auth-context.js

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/profile", {
        credentials: "include",
      });
      setProfile(response.ok ? await response.json() : null);
    } catch (error) {
      setProfile(null);
      console.error("Profile fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const login = useCallback(
    async (userName, password) => {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userName, password }),
        });

        if (!response.ok) throw new Error("Invalid credentials");

        await fetchProfile();
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    [fetchProfile]
  );

  const value = useMemo(
    () => ({
      profile,
      loading,
      login,
      isRole:
        profile?.userRole === "admin"
          ? "admin"
          : profile?.userRole === "patient"
          ? "patient"
          : profile?.userRole === "hospital"
          ? "hospital"
          : null,
    }),
    [profile, loading, login]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { AuthProvider, useAuth };
