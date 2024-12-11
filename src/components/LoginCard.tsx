import {useAuth} from "../hooks";
import React,{ useState } from "react";
import PopUp from "./basic/PopUp.tsx";
import ThemedInput from "./form/ThemedInput.tsx";
import {DefaultButton} from "./index.ts";

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
                        <ThemedInput
                            value={email}
                            onChange={(e) => handleInputChange(e, setEmail)}
                            type={'text'}
                            placeholder={"Email"}
                        />
                        <ThemedInput
                            value={password}
                            onChange={(e) => handleInputChange(e, setPassword)}
                            type={'password'}
                            placeholder={"Password"}
                        />
                        <DefaultButton
                            onClick={()=>{
                                signIn(email, password, () => onClose(false))
                            }}
                        >
                            Login
                        </DefaultButton>
                    </div>
                )
            }
        </PopUp>
    );
}

export default LoginCard;