import { createContext } from "react";

interface IncrementoType {
    refresh:  number
    incremento: ()=>void
}

export const RefreshContext = createContext<IncrementoType | null>(null);