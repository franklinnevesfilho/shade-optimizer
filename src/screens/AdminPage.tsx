import {useEffect, useState} from 'react';
import {useAuth} from "../hooks";
import Tabs from "../components/basic/Tabs.tsx";
import ItemInventory from "../components/admin/ItemInventory.tsx";

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
    }, [authUser])


    const collections = [
        {
            name: 'Bottom Rails',
            component: <ItemInventory
                collectionName={'BottomRailCollection'}
                type={'BottomRail'}
            />
        },
        {
            name: 'Fabrics',
            component: <ItemInventory
                collectionName={'FabricCollection'}
                type={'Fabric'}
            />
        },
        {
            name:"Systems",
            component: <ItemInventory
                collectionName={'SystemCollection'}
                type={'System'}
            />
        },
        {
            name:"Tubes",
            component: <ItemInventory
                collectionName={'TubeCollection'}
                type={'Tube'}
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