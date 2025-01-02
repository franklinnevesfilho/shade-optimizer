import {createContext} from "react";
import {User} from "../types";

export interface AuthContextType {
    authUser: User | null;
    loading: boolean;
    isInitializing: boolean;
    signIn: (email: string, password: string, onComplete?: () => void) => Promise<void>;
    logout: () => Promise<void>;
}

// Create a default context value
const defaultAuthContext: AuthContextType = {
    authUser: null,
    loading: false,
    isInitializing: true,
    signIn: async () => {},
    logout: async () => {},
};


export const AuthContext = createContext<AuthContextType>(defaultAuthContext);
