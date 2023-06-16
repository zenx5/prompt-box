import { useState, useEffect, createContext, useContext } from "react";

const ContextMarketing = createContext();

function useMarketing() {
    return useContext(ContextMarketing)
}

function ProviderMarketing({ children }) {
    

    return <ContextMarketing.Provider value={{}}>{children}</ContextMarketing.Provider>
}

export { useMarketing, ProviderMarketing }