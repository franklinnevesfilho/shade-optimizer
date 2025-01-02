import React, { useEffect, useState } from "react";
import { User } from "../types";
import { firebaseAuth } from "../../firebase.config.ts";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {AuthContextType, AuthContext} from "./AuthContext.ts";

interface AuthProviderProps {
    children: React.ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isInitializing, setIsInitializing] = useState<boolean>(true);

    // Handle sign-in
    const signIn = async (email: string, password: string, onComplete?: () => void) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            onComplete?.();
        } catch (e) {
            console.error("Sign-in error:", e);
        } finally {
            setLoading(false);
        }
    };

    // Handle logout
    const logout = async () => {
        setLoading(true);
        try {
            await signOut(firebaseAuth);
            setAuthUser(null);
        } catch (e) {
            console.error("Sign-out error:", e);
        } finally {
            setLoading(false);
        }
    };

    // Restore user session on page refresh
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            firebaseAuth,
            (user) => {
                if (user) {
                    const restoredUser: User = {
                        id: user.uid,
                        name: user.displayName || "Anonymous",
                        email: user.email || "",
                    };
                    setAuthUser(restoredUser);
                } else {
                    setAuthUser(null);
                }
                setIsInitializing(false);
            },
            (error) => {
                console.error("Error restoring session:", error);
                setIsInitializing(false);
            }
        );

        return () => unsubscribe();
    }, []);

    const value: AuthContextType = {
        authUser,
        loading,
        isInitializing,
        signIn,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isInitializing && children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
