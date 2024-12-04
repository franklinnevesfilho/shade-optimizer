import React from 'react';
import GoogleButton from "react-google-button";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import { firebaseAuth as auth } from "../../firebase.config";
import {useAuth} from "../hooks/useAuth.ts";
import { PopUp } from "./PopUp.tsx";

interface LoginCardProps{
   onClose: (state: boolean) => void;
}

function LoginCard({ onClose }: LoginCardProps) {

    enum authType {
        NONE,
        EMAIL
    }

    const [selectedAuthType, setSelectedAuthType] = React.useState<authType>(authType.NONE);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const GoogleProvider = new GoogleAuthProvider();

    const {
        setAuthUser
    } = useAuth();

    const handleEmailLogin = async () => {
            signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
                const user = userCredential.user
                setAuthUser({
                    name: user.displayName || '',
                    email: user.email || '',
                    id: user.uid || ''
                });
                console.log("Email Login Token:", user.refreshToken)
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleGoogleLogin = async () => {
        signInWithPopup(auth, GoogleProvider).then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            console.log("Google Login Token:", token)
            setAuthUser({
                name: user.displayName || '',
                email: user.email || '',
                id: user.uid || ''
            });


        }).catch((error) => {
            console.log(error);
        });
    }

    const DefaultButton = ({style, onClick, children}: {onClick: () => void, children: React.ReactNode, style?: string}) => {
        return (
            <button
                className={`
                btn btn-square w-[88%] border border-white bg-transparent text-white
                hover:bg-white hover:text-neutral-700 hover:font-bold ${style}
                `}
                onClick={onClick}>
                {children}
            </button>
        );
    }

    const DefaultScreen = () => {
        return(
            <div className={'flex flex-col gap-5'}>
                <div className={`
                flex flex-col gap-5 justify-center items-center
                `}>
                    <DefaultButton onClick={() => setSelectedAuthType(authType.EMAIL)}>Email</DefaultButton>
                    <GoogleButton
                        onClick={handleGoogleLogin}
                        style={{borderRadius: '0.5rem', overflow: 'hidden'}}
                        type={'dark'}
                    />
                </div>
            </div>
        )
    }

    const handleInputChange =
        (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
        e.preventDefault()
        setter(e.target.value)
    }

    return (
        <PopUp
            onClose={onClose}
            title={'Login'}
        >
            {
                selectedAuthType === authType.NONE ? <DefaultScreen/> :(
                    <div className={`
                    flex flex-col gap-5 justify-center items-center
                    `}>
                        <input
                            className={'w-[88%] h-[3rem] border border-white bg-transparent text-white p-2 rounded'}
                            type={'text'}
                            placeholder={"Email"}
                            onChange={(e) => handleInputChange(e, setEmail)}
                            value={email}
                        />
                        <input
                            className={'w-[88%] h-[3rem] border border-white bg-transparent text-white p-2 rounded'}
                            type={'text'}
                            placeholder={"Password"}
                            onChange={(e) => handleInputChange(e, setPassword)}
                            value={password}
                        />
                        <button className={`
                        btn btn-square w-[88%] border border-white bg-transparent text-white
                        hover:bg-white hover:text-neutral-700 hover:font-bold text-xl font-bold
                        `}
                                onClick={handleEmailLogin}>
                            Login
                        </button>
                        <button className={`
                        btn btn-square w-[88%] border border-white bg-transparent text-white
                        hover:bg-white hover:text-neutral-700 hover:font-bold text-xl font-bold
                        `}
                                onClick={()=> setSelectedAuthType(authType.NONE)}>
                            Back
                        </button>
                    </div>
                )
            }
        </PopUp>
    );
}

export default LoginCard;