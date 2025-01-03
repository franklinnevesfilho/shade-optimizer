import DefaultButton from "./basic/DefaultButton.tsx";
import { useEffect, useState, useMemo } from "react";
import { BottomRailCollection, FabricCollection, SystemCollection, TubeCollection } from "../types";
import { collection, getDocs } from "firebase/firestore";
import { firebaseDB } from "../../firebase.config.ts";

interface EditCollectionProps {
    collectionName: string;
    type: "bottomRail" | "fabric" | "system" | "tube";
}

function EditCollection({ collectionName, type }: EditCollectionProps) {
    const [data, setData] = useState<(BottomRailCollection | FabricCollection | SystemCollection | TubeCollection)[]>([]);

    const Header = () => (
        <div
            className="w-full h-20 flex justify-end items-center border-b"
        >
            <DefaultButton>Add New</DefaultButton>
        </div>
    );

    useEffect(() => {
        const fetchData = async () => {
            const snapshot = await getDocs(collection(firebaseDB, collectionName));
            const fetchedData = snapshot.docs.map((doc) => doc.data());

            const typedData = fetchedData.map((doc) => {
                switch (type) {
                    case "bottomRail":
                        return doc as BottomRailCollection;
                    case "fabric":
                        return doc as FabricCollection;
                    case "system":
                        return doc as SystemCollection;
                    case "tube":
                        return doc as TubeCollection;
                    default:
                        throw new Error("Invalid collection type");
                }
            });

            setData(typedData);
        };

        fetchData();
    }, [collectionName, type]);

    const sortedData = useMemo(() => {
        if (type === "tube") {
            return [...data].sort((a, b) => {
                const aNum = parseInt(a.name.slice(0, 2), 10);
                const bNum = parseInt(b.name.slice(0, 2), 10);
                return aNum - bNum;
            });
        }
        return data;
    }, [data, type]);

    return (
        <div className="flex flex-col justify-start items-center w-full h-full overflow-hidden">
            <Header />
            <div className="flex flex-col w-full min-h-full overflow-y-auto">
                {sortedData.map((item, index) => (
                    <div
                        key={index} // Assuming each item has a unique `id`
                        className="w-full min-h-28 flex justify-between items-center border-b"
                    >
                        <span>{item.name}</span>
                        <DefaultButton>Edit</DefaultButton>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EditCollection;
