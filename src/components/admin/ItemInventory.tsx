import { useEffect, useState, useMemo } from "react";
import { BottomRailCollection, FabricCollection, SystemCollection, TubeCollection } from "../../types";
import {collection, getDocs, addDoc, deleteDoc, doc, setDoc} from "firebase/firestore";
import { firebaseDB } from "../../../firebase.config.ts";
import DefaultButton from "../basic/DefaultButton.tsx";
import { PopUp } from "../index.ts";
import { ItemCollection } from "../../types/Components.ts";
import AddBottomRail from "./AddBottomRail.tsx";
import AddFabric from "./AddFabric.tsx";
import AddSystem from "./AddSystem.tsx";
import AddTube from "./AddTube.tsx";


interface AdminPageProps {
    collectionName: string;
    type: "BottomRail" | "Fabric" | "System" | "Tube";
}

function ItemInventory({ collectionName, type}: AdminPageProps) {
    const [data, setData] = useState<(BottomRailCollection | FabricCollection | SystemCollection | TubeCollection)[]>([]);
    const [mode, setMode] = useState<"default" | "edit" | "add">("default");
    const [selectedItem, setSelectedItem] = useState<ItemCollection | undefined>(undefined);
    const [refreshKey, setRefreshKey] = useState(0); // State for forcing re-renders

    const Header = () => (
        <div className="w-full h-20 flex justify-end items-center border-b p-5">
            <DefaultButton
                darkStyle={`bg-green-800 text-neutral-100 border-green-800 hover:bg-green-600 hover:text-white hover:border-green-600`}
                lightStyle={`bg-green-500 text-white border-green-500 hover:bg-green-600 hover:text-white hover:border-green-600`}
                onClick={() => setMode("add")}
            >
                Add New
            </DefaultButton>
        </div>
    );

    const closeModal = () => {
        setMode("default");
    }

    const onSave = async (item: ItemCollection, collectionName: string) => {

        const itemId = item.id;
        //remove id from item;
        delete item.id;

        if(itemId){
            await setDoc(doc(firebaseDB, collectionName, itemId), item);
        }else{
            const docRef = await addDoc(collection(firebaseDB, collectionName), item);
            await setDoc(doc(firebaseDB, collectionName, docRef.id), {id: docRef.id}, {merge: true});
        }

        setMode("default");
        setRefreshKey((prevKey) => prevKey + 1); // Update refreshKey to force re-render
    }

    const onDelete = async (id: string, collectionName: string) => {
        await deleteDoc(doc(firebaseDB, collectionName, id));
        setRefreshKey((prevKey) => prevKey + 1); // Update refreshKey to force re-render
        console.log("Deleted item with ID:", id);
    }

    const addItem = (selected?: ItemCollection) => {
        switch(type){
            case 'BottomRail':
                return <AddBottomRail
                    item={selected}
                    onSave={(item: ItemCollection) => onSave(item, 'BottomRailCollection')}
                />
            case 'Fabric':
                return <AddFabric
                    item={selected}
                    onSave={(item: ItemCollection) => onSave(item, 'FabricCollection')}
                />
            case 'System':
                return <AddSystem
                    item={selected}
                    onSave={(item: ItemCollection) => onSave(item, 'SystemCollection')}
                />
            case 'Tube':
                return <AddTube
                    item={selected}
                    onSave={(item: ItemCollection) => onSave(item, 'TubeCollection')}
                />
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(collection(firebaseDB, collectionName));
            const fetchedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

            const typedData = fetchedData.map((doc) => {
                switch (type) {
                    case "BottomRail":
                        return doc as BottomRailCollection;
                    case "Fabric":
                        return doc as FabricCollection;
                    case "System":
                        return doc as SystemCollection;
                    case "Tube":
                        return doc as TubeCollection;
                    default:
                        throw new Error("Invalid collection type");
                }
            });

            setData(typedData);
        };

        fetchData();
    }, [collectionName, type, refreshKey]); // Add refreshKey to the dependency array

    const sortedData = useMemo(() => {
        if (type === "Tube") {
            return [...data].sort((a, b) => {
                const aNum = parseInt(a.name.slice(0, 2), 10);
                const bNum = parseInt(b.name.slice(0, 2), 10);
                return aNum - bNum;
            });
        } else {
            //     alphabetical order
            return [...data].sort((a, b) => a.name.localeCompare(b.name));
        }

    }, [data, type]);

    return (
        <div className="flex flex-col justify-start items-center w-full h-full overflow-hidden">
            <Header

            />
            <div className="flex flex-col w-full min-h-full overflow-y-auto pb-20">
                {sortedData.map((item, index) => (
                    <div
                        key={index}
                        className="w-full min-h-28 flex justify-between items-center border-b"
                    >
                        <span>{item.name}</span>
                        <div className="flex flex-row gap-2">
                            <DefaultButton
                                darkStyle={`bg-blue-800 text-neutral-100 border-blue-800 hover:bg-blue-600 hover:text-white hover:border-blue-600`}
                                lightStyle={`bg-blue-500 text-white border-blue-500 hover:bg-blue-600 hover:text-white hover:border-blue-600`}
                                onClick={() => {
                                    setSelectedItem(item);
                                    setMode("edit");
                                }}
                            >
                                Edit
                            </DefaultButton>
                            <DefaultButton
                                darkStyle={`bg-red-700 text-neutral-100 border-red-700 hover:bg-red-600 hover:text-white hover:border-red-600`}
                                lightStyle={`bg-red-500 text-white border-red-500 hover:bg-red-600 hover:text-white hover:border-red-600`}
                                onClick={() => item.id && onDelete(item.id, collectionName)}
                            >
                                Delete
                            </DefaultButton>
                        </div>
                    </div>
                ))}
            </div>
            {
                mode == 'edit' && selectedItem !== undefined ? (
                    <PopUp
                        title={`Edit ${type}`}
                        onClose={() => closeModal()}
                    >
                        {addItem(selectedItem)}
                    </PopUp>
                ):(
                    mode == 'add' && (
                      <PopUp
                            title={`Add ${type}`}
                            onClose={() => closeModal()}
                      >
                          {addItem()}
                      </PopUp>
                    )
                )
            }
        </div>
    );
}

export default ItemInventory;
