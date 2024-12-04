import React, {useEffect, useState} from "react";
import {User} from "../types";
import {AuthContext} from "./AuthContext.ts";
import {firebaseAuth} from "../../firebase.config.ts";
import {onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";

interface AuthProviderProps {
    children: React.ReactNode;
}
function AuthProvider({children}: AuthProviderProps) {
    const [authUser, setAuthUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    const signIn = async (email: string, password: string, completedFn:() => void) => {
        setLoading(true)
        try{
            await signInWithEmailAndPassword(firebaseAuth, email, password)
            completedFn()
        }catch (e){
            console.log(e)
        }finally {
            setLoading(false)
        }

    }

    const logout = ()=> {
        return signOut(firebaseAuth)
    }

    useEffect(()=>{
        return onAuthStateChanged(firebaseAuth, (user) => {
            const curUser: User | null = user ? (
                    {
                        id: user.uid,
                        name: user.displayName,
                        email: user.email
                    } as User
                ) : null

            setAuthUser(curUser)
            setLoading(false)
        }, (error)=>{
            console.log(error)
            setLoading(false)
        }, ()=>{
            setLoading(false)
        })
    }, [])

    const value = {
        authUser,
        signIn,
        logout,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export {AuthProvider};