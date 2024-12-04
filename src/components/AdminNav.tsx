import {useAuth} from "../hooks/useAuth.ts";
import DefaultButton from "./basic/DefaultButton.tsx";

interface AdminNavProps {
    menuState: boolean;
    setMenuState: (state: boolean) => void;
}

function AdminNav({menuState, setMenuState}: AdminNavProps) {

    const {logout} = useAuth();

    return (
        <div
            className={` 
                ${menuState ? 'flex' : 'hidden'}
                bg-black bg-opacity-40 z-50 fixed top-0 left-0 w-full h-full
            `}
        >
            <div className={` 
                transform transition-transform duration-500 ease-in-out 
                ${menuState ? 'translate-x-0' : '-translate-x-full'}
                fixed top-0 left-0 w-1/2 lg:w-2/6 h-full bg-neutral-900 border-r-2 z-50 gap-5 p-5
                flex flex-col justify-start items-center
            `}>
                <DefaultButton
                    style={`
                        min-w-48
                        `}
                    onClick={() => setMenuState(false)}>
                    Close
                </DefaultButton>
                <DefaultButton
                    style={`
                        min-w-48
                        `}
                    onClick={() => {
                        setMenuState(false);
                        logout();
                    }}>
                    Logout
                </DefaultButton>
            </div>
        </div>
    );
}

export default AdminNav;