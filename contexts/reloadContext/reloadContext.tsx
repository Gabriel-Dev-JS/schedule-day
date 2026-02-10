import { useState } from "react";
import { RefreshContext } from "./refreshContext";



export function RefreshProvider({children}: {children:React.ReactNode}) {
    const [refresh, setRefresh] = useState(0);

    function incremento() {
        setRefresh((prev) => prev + 1);
    }

    return(
        <RefreshContext.Provider value={{ refresh, incremento }}>
            {children}
        </RefreshContext.Provider>
    )
}

export { RefreshContext };

