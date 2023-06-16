import { useTranslation } from "react-i18next"
import { Box, TextField, Button, Select, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useStorage } from '../services/StorageService'

export default function FormPrompt({ notAllDelete, onCreate, onAllDelete, sx={} }) {
    const [index, setIndex] = useState(null);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('prompt');
    const [visible, setVisible] = useState(true);
    const { t:translate } = useTranslation()
    const { current, setPrompt, clearPrompts } = useStorage()

    useEffect(()=>{
        if( current ) {
            setIndex( prev => current.id )
            setName( prev => current.name )
            setContent( prev => current.content )
            setType( prev => current.type )
            setVisible( prev => !current.hidden )
        }
    },[current])

    const handlerChangeName = (event) => {
        setName( prev => event?.target?.value )
    }

    const handlerChangeContent = (event) => {
        setContent( prev => event?.target?.value )
    }

    const handlerChangeType = (event) => {
        setType( prev => event?.target?.value )
    }
    const handlerChangeVisible = (event) => {
        setVisible( prev => event?.target?.value )
    }

    const handlerSave = () => {
        setPrompt({
            id:index,
            name,
            content,
            type,
            hidden: type==='folder' ? false : !visible
        })
        if( onCreate ) onCreate( {
            id:index,
            name,
            content,
            type,
            hidden: type==='folder' ? false : !visible
        } )
        setIndex(null)
        setName('')
        setContent('')
        setType('prompt')
        setVisible(true)
    }

    const handlerAllDelete = () => {
        clearPrompts()
        if( onAllDelete ) onAllDelete()
    }

    return <Box sx={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'space-evenly',
        alignItems:'center',
        gap:2,
        ...sx
    }}>
        <Box sx={{ display:'flex', alignItems:'center', gap:2, boxShadow:'0 0 1px', p:2, borderRadius:2, width:'80%'}}>
            <TextField size="small" placeholder={translate('name')} value={name} onChange={handlerChangeName} sx={{width:'30%'}}/>
            <TextField size="small" placeholder={translate('content')} value={content} onChange={handlerChangeContent} sx={{width:'70%'}}/>
        </Box>
        <Box sx={{ display:'flex', alignItems:'center', gap:2, boxShadow:'0 0 1px', p:2, borderRadius:2, width:'80%'}}>
            <Select size="small" value={type} onChange={handlerChangeType} sx={{width:'30%'}}>
                <MenuItem value={'prompt'}>{translate('prompt')}</MenuItem>
                <MenuItem value={'folder'}>{translate('folder')}</MenuItem>
            </Select>
            <Select size="small" value={visible} onChange={handlerChangeVisible} sx={{width:'30%'}}>
                <MenuItem value={true}>{translate('visible')}</MenuItem>
                <MenuItem value={false}>{translate('not_visible')}</MenuItem>
            </Select>
            <Box  sx={{ display:'flex', flexDirection:'row', justifyContent:'center', width:'40%', gap:2 }}>
                <Button variant='contained' size='small' onClick={handlerSave}>{translate('save')}</Button>
                { !notAllDelete && <Button variant='contained'  size='small' color='error' onClick={handlerAllDelete} >{translate('delete_all')}</Button>}
            </Box>
        </Box>
        
    </Box>
}