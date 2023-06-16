import { useTranslation } from 'react-i18next';
import { Box, Button, IconButton, List, ListItem, ListItemText, Tooltip, Typography } from '@mui/material'
import { Delete as DeleteIcon, CopyAll as CopyIcon, Check as CheckIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react'
import { useStorage } from '../services/StorageService'
import ItemPrompt from './ItemPrompt';

export default function ListPrompts({ compact }) {
    const {t:translate} = useTranslation()
    const {list:prompts, empty, removePrompt } = useStorage()

    const handlerDelete = (index) => () => {
        const prompt = prompts.find(prompt => prompt.id===index)
        const name = prompt.name ?? prompt.content
        if( confirm(`${translate('confirm_delete')}: "${name}"`) ) {
            removePrompt(index)
        }
    }


    const MapingPrompts = () => {
        return prompts.map( (prompt) => <ItemPrompt key={prompt.id} prompt={prompt} compact={compact} onDelete={handlerDelete(prompt.id)} /> )
    }

    return <Box>
        <List>
            { empty ? <Typography sx={styleEmptyMessage}>- {translate('empty')} -</Typography> : <MapingPrompts />  }
        </List>
    </Box>
}

const styleEmptyMessage = {
    opacity:0.8,
    textAlign:'center',
    p:2,
    boxShadow:'0 0 1px',
    borderRadius:2,
    mx:5
}