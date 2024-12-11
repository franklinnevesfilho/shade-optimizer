import { useAuth } from "../hooks";
import DefaultButton from "./basic/DefaultButton.tsx";
import { useTheme } from "../hooks";
import { HamburgerBtn } from "./index.ts";
import { useState } from "react";

function AdminNav() {
    const [showMenu, setShowMenu] = useState(false);

    const { theme } = useTheme();
    const { logout } = useAuth();

    const getThemeClasses = (lightClass: string, darkClass: string) =>
        theme === "dark" ? darkClass : lightClass;

    const bgColor = getThemeClasses("bg-neutral-300", "bg-neutral-900");
    const textColor = getThemeClasses("text-neutral-800", "text-neutral-300");
    const borderColor = getThemeClasses("border-neutral-300", "border-neutral-700");
    const hoverColor = getThemeClasses("hover:border-neutral-400", "hover:border-neutral-500");

    return (
        <div>
            <div className={`
            fixed top-10 left-0 transition-transform duration-300 z-30
            `}>
                <HamburgerBtn
                    style={`
                    border-none ${bgColor}
                    `}
                    state={showMenu}
                    onToggle={() => setShowMenu((prev) => !prev)}
                    aria-expanded={showMenu}
                />
            </div>

            {/* Side Navigation */}
            <div
                className={`fixed top-0 left-0 w-1/2 md:w-1/6 h-full flex flex-col gap-5 
                transform ${showMenu ? "translate-x-0" : "-translate-x-full"} 
                ${bgColor} ${textColor} ${borderColor} ${hoverColor} 
                transition-transform duration-300 z-20`}
            >
                <div className={`
                mt-16
                flex flex-col gap-5 p-5
                `}>
                    <DefaultButton
                        onClick={() => {
                            logout();
                            setShowMenu(false);
                        }}
                    >
                        Logout
                    </DefaultButton>
                </div>
            </div>
        </div>
    );
}

export default AdminNav;
