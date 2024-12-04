import React, {useState} from "react";
import {User} from "../types";
import {AuthContext} from "../contexts/AuthContext";

interface AuthProviderProps {
    children: React.ReactNode;
}
function AuthProvider({children}: AuthProviderProps) {
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

export {AuthProvider};