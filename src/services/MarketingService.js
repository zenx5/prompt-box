import { useState, useEffect, createContext, useContext } from "react";

const ContextMarketing = createContext();

function useMarketing() {
    return useContext(ContextMarketing)
}

function ProviderMarketing({ children }) {
    const [message, setMessage] = useState('')

        

    return <ContextMarketing.Provider value={{message}}>{children}</ContextMarketing.Provider>
}

export { useMarketing, ProviderMarketing }