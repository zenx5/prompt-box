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

const getItem = async (key, defaultError = []) => {
    try {
        const response = await chrome.storage.local.get(key)
        return response[key]
    } catch( error ) {
        console.log( error )
        return defaultError
    }
}


function ProviderStorage({ children }) {
    const [loaded, setLoaded] = useState( false );
    const [empty, setEmpty] = useState( true )
    const [hasParent, setHasParent] = useState(false)
    const [indexPrompt, setIndexPrompt] = useState(0)
    const [prompts, setValue ] = useState([])
    const [list, setList ] = useState([])
    const [path, setPath] = useState([0])

    useEffect(() => {
        if( !loaded ) {
            (async ()=>{
                setValue( await getItem('prompts',[]) )
                setIndexPrompt( await getItem('index',0) )
            })()
            setLoaded(true)
        }
    }, [prompts]);

    useEffect(() => {
        if( list.length===0 && !empty ){
            setEmpty(true)
        } else if( list.length>0 && empty ) {
            setEmpty(false)
        }
        setList( prev => getList() )
    }, [prompts, path]);

    const go = async (newPath) => {
        console.log('in go', newPath )
        setHasParent( true )
        setPath( prev => [...prev, newPath] )
    }

    const back = async () => {
        if( hasParent ) {
            setHasParent( path.slice(0,-1).length!==1 )
            setPath( prev => prev.slice(0,-1) )
        }
    }

    /**
     * 
     * @param {object} value 
     *      type: folder|prompt
     *      content: string
            parent: integer
            hidden: boolean
     */
    const setPrompt = async (value) => {
        const newPrompt = {
            ...value,
            id: indexPrompt + 1,
            parent: path.slice(-1)[0]
        }
        
        const auxPrompts = [...prompts, newPrompt]
        setValue( prevPrompts => auxPrompts)
        await setItem('prompts', auxPrompts)
        await setItem('index', indexPrompt + 1)
        setIndexPrompt( prev => indexPrompt + 1)
    }


    const removePrompt = async (removeIndex) => {
        const newPrompts = prompts.filter( prompt => (prompt.id!==removeIndex ))
        setValue( prevPrompts => newPrompts)
        await setItem('prompts', newPrompts)
    }

    const clearPrompts = async () => {
        setValue([])
        await setItem('prompts', [])
    }

    const getList = () => {
        console.log(prompts)
        return prompts.filter( prompt => prompt.parent===path.slice(-1)[0] )
    }

    return <ContextStorage.Provider 
        value={{
            list,
            go,
            back,
            hasParent,
            empty,
            setPrompt,
            removePrompt,
            clearPrompts
        }}>{children}</ContextStorage.Provider>
}

export { useStorage, ProviderStorage }