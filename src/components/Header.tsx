import {useAuth} from "../hooks";
import { useState } from "react";
import {
    DefaultButton,
    Title,
    LoginCard,
    AdminNav
} from "../components";

function Header() {
    const { authUser } = useAuth();
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <div className={`
            flex justify-center items-center w-[95%] h-20 text-white mb-auto
            mt-5 ${authUser && 'flex-col md:flex-row'}
            `}>

                <div className="w-full flex flex-row justify-between ">
                    {
                        authUser &&
                        <AdminNav/>
                    }

                    <Title style={`mx-auto`}>Vertilux's Shade Optimizer</Title>
                    {!authUser &&
                        <DefaultButton
                            onClick={() => setToggle(true)}
                        >
                            Login
                        </DefaultButton>
                    }
                </div>
            </div>
            {
                toggle &&
                <LoginCard onClose={() => setToggle(false)}/>
            }
        </>
    );
}

export default Header;