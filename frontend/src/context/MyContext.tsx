import { ReactNode, createContext, useContext, useState } from "react";
import { Instance } from "../utils";

interface MyContextProps {
    children: ReactNode;
}

interface MyContextData {
    instances: Instance[];
    setInstances: (instances: Instance[]) => void;
}

const MyContext = createContext<MyContextData>({} as MyContextData);

export function MyContextProvider({ children }: MyContextProps) {
    const [instances, setInstances] = useState<Instance[]>([]);

    return (
        <MyContext.Provider value={{ instances, setInstances }}>
            {children}
        </MyContext.Provider>
    );
}

export function useMyContext() {
    const context = useContext(MyContext);
    return context;
}