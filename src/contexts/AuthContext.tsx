import React, {useState, useContext} from "react";
import {User} from "../types";

type AuthContextType = {
    authUser: User | null;
    setAuthUser: React.Dispatch<React.SetStateAction<User | null>>;
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = React.createContext<AuthContextType>({
    authUser: null,
    setAuthUser: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {}
});

function useAuth() {
    return useContext(AuthContext);
}

interface AuthProviderProps {
    children: React.ReactNode;
}

export function AuthProvider({children}: AuthProviderProps) {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default useAuth;
