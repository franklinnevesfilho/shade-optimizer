import Title from "./Title.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {useState} from "react";
import {PopUp} from "./PopUp.tsx";
import LoginCard from "./LoginCard.tsx";

function Header() {
    const { authUser, setIsLoggedIn, isLoggedIn } = useAuth();
    const [toggle, setToggle] = useState(false);

    return (
        <>
            <div className={`
        flex flex-row justify-center items-center w-[95%] h-20 text-white mb-auto
        gap-5 mt-5
        `}>
                <Title style={'ms-16 flex-grow'}>Vertilux's Shade Optimizer</Title>
                <div className={`flex flex-row items-center justify-center `}>
                    { isLoggedIn && authUser ? (
                        <div className={`mr-5`}>
                            <div className={`text-lg`}>
                                {authUser.name}
                            </div>
                            <div className={`text-sm`}>
                                {authUser.email}
                            </div>
                            <button className={`btn bg-neutral-700 text-neutral-100 hover:bg-neutral-100 hover:text-neutral-800`}
                                    onClick={() => setIsLoggedIn(false)}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className={``}>
                            <button className={`btn bg-neutral-700 text-neutral-100
                        hover:bg-neutral-100 hover:text-neutral-800
                        `}
                                    onClick={() => setToggle(!toggle)}
                            >
                                Admin Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
            {
                toggle &&
                <PopUp
                    onClose={setToggle}
                    title={'Admin Login'}
                >
                    <LoginCard/>
                </PopUp>
            }
        </>
    );
}

export default Header;