import { useState, useEffect, createContext, useContext } from "react";

const ContextStorage = createContext();

function useStorage() {
    return useContext(ContextStorage)
}

const setItem = async (key, value) => {
    try {
        await chrome.storage.local.set({
            [key]:value
        })
    } catch( error ) {
        console.log( error )
    }
}

const getItem = async (key) => {
    try {
        const response = await chrome.storage.local.get(key)
        return response[key]
    } catch( error ) {
        console.log( error )
        return []
    }
}


function ProviderStorage({ children }) {
    const [loaded, setLoaded] = useState( false );
    const [empty, setEmpty] = useState( true )
    const [ prompts, setValue ] = useState([])

    useEffect(() => {
        if( !loaded ) {
            (async ()=>{
                setValue( await getItem('prompts') )
            })()
            setLoaded(true)
        }
    }, [prompts]);

    useEffect(() => {
        if( prompts.length===0 && !empty ){
            setEmpty(true)
        } else if( prompts.length>0 && empty ) {
            setEmpty(false)
        }
    }, [prompts]);

    const setPrompt = async (value) => {
        const newPrompts = [
            ...prompts,
            value
        ]
        setValue( prevPrompts => newPrompts)
        await setItem('prompts', newPrompts)
    }

    const removePrompt = async (value) => {
        const isNumber = !Number.isNaN( Number(value) )
        const newPrompts = prompts.filter( (prompt, index) => (isNumber?index:prompt)!==value )
        setValue( prevPrompts => newPrompts)
        await setItem('prompts', newPrompts)
    }

    const clearPrompts = async () => {
        setValue([])
        await setItem('prompts', [])
    }

    return <ContextStorage.Provider value={{prompts, empty, setPrompt, removePrompt, clearPrompts}}>{children}</ContextStorage.Provider>
}

export { useStorage, ProviderStorage }