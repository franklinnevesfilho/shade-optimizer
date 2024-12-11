import ShadeBuilder from "../components/ShadeBuilder/ShadeBuilder.tsx";
import {useState} from "react";
import Tabs from "../components/basic/Tabs.tsx";


function Home() {

    const [selectedTab, setSelectedTab] = useState(0);

    const tabs = [
        {
            name: "Build a Shade",
            component: <ShadeBuilder />
        },
        {
            name: "Tube Limits",
            component: <div>Tube Limits</div>
        }]

    return (
        <div className={`
        w-full h-full flex flex-col items-center justify-center
        `}>
            <div className={`
            w-[90%] sm:w-[60%] h-[90%] sm:h-[80%] flex flex-col p-5 mb-auto relative
            `}>
                <Tabs
                    tabs={tabs}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                />
            </div>
        </div>
    );
}

export default Home;