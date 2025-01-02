import {useEffect, useState} from 'react';
import {useAuth} from "../hooks";
import Tabs from "../components/basic/Tabs.tsx";
import EditCollection from "../components/EditCollection.tsx";

function AdminPage() {
    const [selectedTab, setSelectedTab] = useState(0);
    const {authUser} = useAuth()

    useEffect(()=>{
        if(!authUser){
            window.location.href = '/'
            console.log('Redirecting to Home Page')
        }else{
            console.log('Admin Page')
        }
    }, [])


    const collections = [
        {
            name: 'Bottom Rails',
            component: <EditCollection
                collectionName={'BottomRailCollection'}
                type={'bottomRail'}
            />
        },
        {
            name: 'Fabrics',
            component: <EditCollection
                collectionName={'FabricCollection'}
                type={'fabric'}
            />
        },
        {
            name:"Systems",
            component: <EditCollection
                collectionName={'SystemCollection'}
                type={'system'}
            />
        },
        {
            name:"Tubes",
            component: <EditCollection
                collectionName={'TubeCollection'}
                type={'tube'}
            />
        }
    ]

    return (
        <div
            className={`
            flex w-full h-full justify-center items-start
            `}
        >
            <div
                className={`
            w-[90%] sm:w-[60%] h-[90%] sm:h-[80%] flex flex-col p-5 mb-auto relative
            `}
            >
                <Tabs
                    tabs={collections}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                />
            </div>
        </div>
    );
}

export default AdminPage;