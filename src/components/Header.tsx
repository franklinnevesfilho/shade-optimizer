import {useAuth} from "../hooks/useAuth.ts";
import { useState } from "react";
import {
    DefaultButton,
    Title,
    HamburgerBtn,
    LoginCard,
    AdminNav
} from "../components";

function Header() {
    const { authUser } = useAuth();
    const [toggle, setToggle] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <>
            <div className={`
            flex justify-center items-center w-[95%] h-20 text-white mb-auto
            mt-5 ${authUser && 'flex-col md:flex-row'}
            `}>
                <div className="w-full flex flex-row justify-between ">
                    {
                        authUser ? (
                            <>
                                <div className={'md:fixed left-5'}>
                                    <HamburgerBtn state={showMenu} onToggle={() => setShowMenu(!showMenu)}/>
                                </div>
                                <AdminNav
                                    menuState={showMenu}
                                    setMenuState={setShowMenu}
                                />
                            </>
                        ) : (
                            <div className={`md:fixed right-5 `}>
                                {!authUser &&
                                <DefaultButton
                                    onClick={() => setToggle(true)}
                                >
                                    Login
                                </DefaultButton>
                                }
                            </div>
                        )
                    }
                    <Title style={`flex-grow`}>Vertilux's Shade Optimizer</Title>
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