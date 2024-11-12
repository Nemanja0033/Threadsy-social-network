import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthContextProps } from "../types/authContextType";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean>(JSON.parse(localStorage.getItem("isAuth") || "false"));
  const [userName, setUserName] = useState<string>(localStorage.getItem("userName") || "");

  useEffect(() => {
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
    localStorage.setItem("userName", userName);
  }, [isAuth, userName]);

  return (
    <AuthContext.Provider value={{ isAuth, userName, setIsAuth, setUserName }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
