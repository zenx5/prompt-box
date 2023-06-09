import { useTranslation } from "react-i18next"
import { Typography, Box, Divider, Button, Popover } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ListPrompts, FormPrompt } from "../../components"
import { useEffect, useState } from "react"
import { allLangs } from "../../locales/config-lang"
import i18n from "../../locales/i18n"

export default function Popup(){
    const [currentLang, setCurrentLang] = useState( localStorage.getItem('i18nextLng') ?? 'es')
    const [langTag, setLangTag] = useState( 'Spanish' )
    const [create, setCreate] = useState(false)
    const navigate = useNavigate()
    const { t:translate } = useTranslation()

    useEffect(()=>{
        console.log('jj')
        setLangTag( prev => allLangs.find( langs => langs.value===currentLang ).label )
    },[currentLang])

    const handlerOpenOptionsPage = () => {
        try{
            chrome.runtime.openOptionsPage()
        } catch(error){
            console.log(error)
            navigate('/configuration')
        }
    }

    const handlerChangeLang = () => {
        const _index = allLangs.findIndex( langs => langs.value===currentLang ) ?? 0
        const index = _index===allLangs.length-1 ? 0 : _index+1
        setLangTag( prev => allLangs[index].label )
        setCurrentLang(prev => allLangs[index].value )
        localStorage.setItem('i18nextLng', allLangs[index].value)
        i18n.changeLanguage( allLangs[index].value );
    }

    return <Box sx={{ width:'auto', minWidth:'600px' }}>
        <Typography variant='h5' sx={{ textAlign:'center', m:2}}>
            {translate('list_prompts')}
            <Button onClick={handlerChangeLang}>{langTag}</Button>
        </Typography>
        { create ? <FormPrompt notAllDelete onCreate={()=>setCreate(false)} /> : <ListPrompts compact/> }
        <Divider sx={{ m:2 }}/>
        <Box sx={{ display:'flex', flexDirection:'row', gap:3 }}>
            <Button variant='outlined' onClick={ () => setCreate(true) } disabled={create} sx={{ display:'flex', mx:'auto' }}>{translate('add')}</Button>
            <Button variant='outlined' onClick={handlerOpenOptionsPage} sx={{ display:'flex', mx:'auto' }}>{translate('manage')}</Button>
        </Box>
    </Box>
}