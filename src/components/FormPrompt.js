import { useTranslation } from "react-i18next"
import { Box, TextField, Button } from '@mui/material'
import { useState } from 'react'
import { useStorage } from '../services/StorageService'

export default function FormPrompt({ notAllDelete, onCreate, onAllDelete }) {
    const [value, setValue] = useState('');
    const { t:translate } = useTranslation()
    const { setPrompt, clearPrompts } = useStorage()

    const handlerChange = (event) => {
        setValue( prev => event?.target?.value )
    }

    const handlerSave = () => {
        setPrompt(value)
        if( onCreate ) onCreate( value )
        setValue('')
    }

    const handlerAllDelete = () => {
        clearPrompts()
        if( onAllDelete ) onAllDelete()
    }

    return <Box sx={{
        display:'flex',
        justifyContent:'space-evenly',
        alignItems:'center',
        gap:2
    }}>
        <Box sx={{ display:'flex', alignItems:'center', gap:2, boxShadow:'0 0 1px', p:2, borderRadius:2, width:'80%'}}>
            <TextField value={value} onChange={handlerChange} sx={{width:'100%'}}/>
            <Button variant='contained' onClick={handlerSave}>{translate('save')}</Button>
        </Box>
        { !notAllDelete && <Button variant='contained' color='error' onClick={handlerAllDelete} >{translate('delete_all')}</Button>}
    </Box>
}