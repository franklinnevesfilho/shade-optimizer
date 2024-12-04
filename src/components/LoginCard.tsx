import {useAuth} from "../hooks/useAuth.ts";
import React,{ useState } from "react";
import PopUp from "./basic/PopUp.tsx";

interface LoginCardProps{
   onClose: (state: boolean) => void;
}

function LoginCard({ onClose }: LoginCardProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signIn, loading } = useAuth();

    const handleInputChange =
        (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
            e.preventDefault()
            setter(e.target.value)
    }

    return (
        <PopUp
            onClose={onClose}
            title={'Admin Login'}
        >
            {
                loading ? (
                    <>loading...</>
                ) : (
                    <div className={`
                    flex flex-col gap-5 justify-center items-center
                    `}>
                        <input
                            className={'pointer-events-auto w-[88%] h-[3rem] border border-white bg-transparent text-white p-2 rounded'}
                            type={'text'}
                            placeholder={"Email"}
                            onChange={(e) => handleInputChange(e, setEmail)}
                            value={email}
                        />
                        <input
                            className={'pointer-events-auto w-[88%] h-[3rem] border border-white bg-transparent text-white p-2 rounded'}
                            type={'text'}
                            placeholder={"Password"}
                            onChange={(e) => handleInputChange(e, setPassword)}
                            value={password}
                        />
                        <button className={`
                        btn btn-square w-[88%] border border-white bg-transparent text-white
                        hover:bg-white hover:text-neutral-700 hover:font-bold text-xl font-bold
                        `}
                                onClick={()=>{
                                    signIn(email, password, () => onClose(false))
                                }}>
                            Login
                        </button>
                    </div>
                )
            }
        </PopUp>
    );
}

export default LoginCard;