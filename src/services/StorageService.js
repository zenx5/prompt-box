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
    const [current, setCurrentPrompt] = useState(null)

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
        const newList = getList()
        if( newList.length===0 && !empty ){
            setEmpty(true)
        } else if( newList.length>0 && empty ) {
            setEmpty(false)
        }
        setList( prev => newList )
    }, [prompts, path]);

    const go = async (newPath) => {
        setHasParent( true )
        setPath( prev => [...prev, newPath] )
    }

    const back = async (steps = 1) => {
        if( hasParent ) {
            setHasParent( path.slice(0,-steps).length!==1 )
            setPath( prev => prev.slice(0,-steps) )
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
        const newPrompt = value.id ? {...value, parent:current.parent} : {
            ...value,
            id: indexPrompt + 1,
            hidden: value.type==='folder' ? false : value.hidden,
            parent: path.slice(-1)[0]
        }
        const index = value.id ? prompts.findIndex( prompt => prompt.id == value.id ) : prompts.length
        const auxPrompts = prompts.toSpliced(index,1,newPrompt)
        setValue( prevPrompts => auxPrompts)
        await setItem('prompts', auxPrompts)
        if( !value.id ){
            await setItem('index', indexPrompt + 1)
            setIndexPrompt( prev => indexPrompt + 1)
            setCurrentPrompt(null)
        }
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
        return prompts.filter( prompt => prompt.parent===path.slice(-1)[0] )
    }

    const getBy = (searchValue, keyTarget, valueKey) => {
        const result = prompts.find( prompt => prompt[keyTarget]===valueKey )
        if( result ) return result[searchValue]
        return null
    }

    const setCurrent = (index) => {
        setCurrentPrompt( prev => prompts.find( prompt => prompt.id==index) )
    }

    const importData = async (data) => {
        let { parent, items } = data
        const [current] = path.slice(-1)
        let newPrompts = []
        let pivot = []
        let nextIndex = indexPrompt
        for(const item of items) {
            nextIndex++
            pivot[ item.id ] = nextIndex
            const newParent = parent===item.parent ? current : pivot[item.parent]
            newPrompts.push({
                ...item,
                id:nextIndex,
                parent: newParent
            })
        }
        await setItem('index', nextIndex )
        setIndexPrompt( prev => nextIndex )
        await setItem('prompts', [...prompts, ...newPrompts] )
        setValue( prev => [...prompts, ...newPrompts] )
    }

    const exportData = () => {
        const link = document.createElement('a')
        const currentPath = path.slice(-1)[0]
        const name = getBy('name', 'id', currentPath) || 'Root'
        let data = {
            parent: currentPath,
            items: []
        }
        for( const prompt of prompts ) {
            const listId = data.items.map( item => item.id )
            if( prompt.parent===data.parent ||  listId.includes(prompt.parent) ) {
                data.items.push( prompt )
            }
        }
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        link.setAttribute('download', `${name}.csv`)
        link.setAttribute('href',dataStr)
        link.setAttribute('style','display:none')
        link.click()
    }

    return <ContextStorage.Provider 
        value={{
            list,
            getBy,
            go,
            back,
            path,
            hasParent,
            empty,
            setPrompt,
            removePrompt,
            clearPrompts,
            current,
            setCurrent,
            exportData, 
            importData
        }}>{children}</ContextStorage.Provider>
}

export { useStorage, ProviderStorage }