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
        <div
            className={`w-full h-20 flex justify-around md:justify-end items-center`}
        >
            <div className="flex md:w-10/12 items-center justify-center">
                <Title>Vertilux's Shade Optimizer</Title>
            </div>
            <div className="flex md:w-1/12">
                {
                    authUser ? (
                        <AdminNav/>
                    ) : (
                        <DefaultButton
                            onClick={() => setToggle(true)}
                        >
                            Login
                        </DefaultButton>
                    )
                }
                {
                    toggle && (
                        <LoginCard
                            onClose={() => setToggle(false)}
                        />
                    )
                }
            </div>
        </div>
    );
}

export default Header;