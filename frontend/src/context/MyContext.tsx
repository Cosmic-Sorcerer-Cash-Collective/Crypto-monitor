import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../utils/hooks/useFetch";
import { Instance, getInstancesUrl } from "../utils";

interface MyContextProps {
    children: ReactNode;
}

interface MyContextData {
    instances: Instance[];
    load: boolean;
    setInstances: (instances: Instance[]) => void;
}

const MyContext = createContext<MyContextData>({} as MyContextData);

export function MyContextProvider({ children }: MyContextProps) {
    const [ instances, setInstances ] = useState<Instance[]>([]);
    const [ load, setLoading ] = useState<boolean>(false);
    const { values, error, loading } : {
        values: any;
        error: any;
        loading: boolean;
    }= useFetch(getInstancesUrl(), 'GET');

    if (error) {
        console.error(error);
    }
    useEffect(() => {
        if (values && loading === false) {
            setInstances(values.containersList.map((instance: any) => ({
                id: instance.id,
                name: instance.name,
                description: instance?.description || "No description",
                price: instance?.price || 0,
                percentage: instance?.percentage || 0,
            })));
        }
        if (loading) {
            setLoading(loading);
        }
    }, [loading]);

    return (
        <MyContext.Provider value={{ instances, setInstances, load }}>
            {children}
        </MyContext.Provider>
    );
}

export function useMyContext() {
    const context = useContext(MyContext);
    return context;
}