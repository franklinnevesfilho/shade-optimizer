import React from "react";
import {User} from "../types";

type AuthContextType = {
    authUser: User | null;
    setAuthUser: (user: User | null) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (loggedIn: boolean) => void;
}

export const AuthContext = React.createContext<AuthContextType>({
    authUser: null,
    setAuthUser: () => {},
    isLoggedIn: false,
    setIsLoggedIn: () => {}
});