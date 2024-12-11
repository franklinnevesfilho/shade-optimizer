import { ReactNode } from "react";
import { useTheme } from "../../hooks";

interface TabProps {
    tabs: { name: string; component: ReactNode }[];
    selectedTab: number;
    setSelectedTab: (index: number) => void;
}

function Tabs({ tabs, selectedTab, setSelectedTab }: TabProps) {
    const { theme } = useTheme();

    const borderColor = theme === "dark" ?
        (`border-neutral-600`) :
        (`border-neutral-200`);

    const unselectedStyle =
        `
        z-0
        ${theme === "dark" ?
            (`
            text-neutral-300 bg-neutral-600 border-neutral-800 border-b-neutral-700
            hover:bg-neutral-700 hover:text-neutral-50 hover:border-b-transparent
            `) : (`
            text-neutral-600 bg-neutral-200 border-neutral-400 border-b-neutral-300
            hover:bg-neutral-100 hover:text-neutral-800 hover:border-b-transparent
            `)
        }`

    const selectedStyle =
        `
        border-b-transparent z-10 -mb-0.5
        ${theme === "dark" ? 
            (`text-neutral-50 bg-neutral-800 border-neutral-700`) : 
            (`text-neutral-800 bg-white border-neutral-200`)
    }`

    return (
        <div className="flex flex-col w-full h-full">
            <div className={`flex w-full ${borderColor} gap-2 relative`}>
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`p-3 cursor-pointer rounded-t-lg font-bold
                            border ${borderColor}
                            transition-colors duration-300
                            ${selectedTab === index
                            ? selectedStyle
                            : unselectedStyle}
                        `}
                        onClick={() => setSelectedTab(index)}
                    >
                        {tab.name}
                    </div>
                ))}
            </div>

            <div className={`
            flex  flex-col 
            w-full h-full border ${borderColor} rounded-lg rounded-tl-none 
            p-4 
            `}
            >
                {tabs[selectedTab].component}
            </div>
        </div>
    );
}

export default Tabs;
