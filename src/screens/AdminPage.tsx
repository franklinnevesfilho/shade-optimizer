import {useEffect, useState} from 'react';
import {useAuth} from "../hooks";
import Tabs from "../components/basic/Tabs.tsx";
import ItemInventory from "../components/admin/ItemInventory.tsx";
import EditItem from "../components/admin/EditItem.tsx";

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
            component: <ItemInventory
                collectionName={'BottomRailCollection'}
                type={'BottomRail'}
                EditComponent={EditItem}
            />
        },
        {
            name: 'Fabrics',
            component: <ItemInventory
                collectionName={'FabricCollection'}
                type={'Fabric'}
                EditComponent={EditItem}
            />
        },
        {
            name:"Systems",
            component: <ItemInventory
                collectionName={'SystemCollection'}
                type={'System'}
                EditComponent={EditItem}
            />
        },
        {
            name:"Tubes",
            component: <ItemInventory
                collectionName={'TubeCollection'}
                type={'Tube'}
                EditComponent={EditItem}
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