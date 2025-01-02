import DefaultButton from "./basic/DefaultButton.tsx";
import {useEffect, useState} from "react";
import {BottomRailCollection, FabricCollection, SystemCollection, TubeCollection} from "../types";
import {collection, getDocs} from "firebase/firestore";
import {firebaseDB} from "../../firebase.config.ts";

interface EditCollectionProps {
    collectionName: string,
    type: 'bottomRail' | 'fabric' | 'system' | 'tube'
}

function EditCollection({ collectionName, type }: EditCollectionProps) {
    const [data, setData] = useState<
        BottomRailCollection[] | FabricCollection[] |
        SystemCollection[] | TubeCollection[]
    >([])

    const Header = () => {
        return (
            <div
                className={`
                w-full h-20
                flex justify-end items-center
                border-b
                `}
            >
                <DefaultButton>
                    Add New
                </DefaultButton>
            </div>
        )
    }

    useEffect(() => {
        const getData = async () => {
            const collectionData: any[] = [];

            const snapshot = await getDocs(collection(firebaseDB, collectionName));
            snapshot.forEach((doc) => {
                switch(type){
                    case 'bottomRail':
                        {
                            const bottomRail: BottomRailCollection = doc.data() as BottomRailCollection
                            collectionData.push(bottomRail)
                            break
                        }
                    case 'fabric':
                        {
                            const fabric: FabricCollection = doc.data() as FabricCollection
                            collectionData.push(fabric)
                            break
                        }
                    case 'system':
                        { const system: SystemCollection = doc.data() as SystemCollection
                        collectionData.push(system)
                        break; }
                    case 'tube':
                        { const tube: TubeCollection = doc.data() as TubeCollection
                        collectionData.push(tube)
                        break; }
                }
            });

            if(type === 'tube'){
                collectionData.sort((a,b) => {
                    const aNum = parseInt(a.name.slice(0,2))
                    const bNum = parseInt(b.name.slice(0,2))
                    return aNum - bNum
                })
            }

            setData(collectionData)
        }
        getData();

    },[collectionName])
    return (
        <div
            className={`
            flex flex-col justify-start items-center w-full h-full
            `}
        >
            <Header/>
            {
                data.map((item) => {
                    return (
                        <div
                            className={`
                            w-full h-20
                            flex justify-between items-center
                            border-b
                            `}
                        >
                            {item.name}
                            <DefaultButton>
                                Edit
                            </DefaultButton>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default EditCollection;