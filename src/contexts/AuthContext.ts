import React from "react";
import {User} from "../types";

type AuthContextType = {
    authUser: User | null;
    signIn: (email: string, password: string, completedFn: ()=> void) => void;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = React.createContext<AuthContextType>({
    authUser: null,
    signIn: () => {},
    logout: () => {},
    loading: false
});