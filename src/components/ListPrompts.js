import { Box, Button, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import { Delete as DeleteIcon, CopyAll as CopyIcon, Check as CheckIcon } from '@mui/icons-material';
import { useState, useEffect } from 'react'
import { useStorage } from '../services/StorageService'

export default function ListPrompts() {
    const [copy, setCopy] = useState(false)
    const {prompts, empty, removePrompt } = useStorage()

    const handlerDelete = (index) => () => {
        if( confirm(`Desea borrar el siguiente prompt: "${prompts[index]}"`) ) {
            removePrompt(index)
        }
    }

    const handlerCopy = (prompt) => () => {
        try{
            const promptElement = document.createElement('textarea');
            promptElement.value = prompt;
            document.body.appendChild(promptElement);
            promptElement.select();
            document.execCommand('copy');
            document.body.removeChild(promptElement);
            setCopy(true)
        } catch (error) {
            console.log('error, no se copio')
        } finally {
            setTimeout( () => {
                setCopy(false)
            }, 1000)
        }
    }

    const MapingPrompts = () => {
        return prompts.map( (prompt,index) => <ListItem
            key={index}
            sx={styleItem}
            secondaryAction={
                <Box>
                    <IconButton onClick={handlerCopy(prompt)}>{ copy ? <CheckIcon sx={{ color:'#05f'}} /> : <CopyIcon />}</IconButton>
                    <IconButton onClick={handlerDelete(index)}><DeleteIcon sx={{ color:'#f50'}} /></IconButton>
                </Box>
            }
        >
            <ListItemText primary={prompt} sx={stylePrompt} />
        </ListItem>)
    }

    return <Box>
        <List>
            { empty ? <Typography sx={styleEmptyMessage}>- Empty -</Typography> : <MapingPrompts />  }
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

const styleItem = {
    p:2,
    boxShadow:'0 0 1px',
    borderRadius:2,
    width:'auto',
    mx:5
}

const stylePrompt = {
    fontStyle:'italic'
}