import { Box, IconButton, ListItem, ListItemText, Tooltip, Typography } from '@mui/material'
import { Delete as DeleteIcon, CopyAll as CopyIcon, Check as CheckIcon } from '@mui/icons-material';
import { useState } from 'react'

export default function ItemPrompt({ prompt, compact, onDelete }) {
    const [copy, setCopy] = useState(false)

    const formatPrompt = (prompt) => {
        if( prompt.length > 50 ) return `${prompt.slice(0,50)}...`
        return prompt
    }

    const handlerCopy = () => {
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

    return <ListItem
        sx={styleItem}
        secondaryAction={
            <Box>
                <IconButton onClick={handlerCopy}>{ copy ? <CheckIcon sx={{ color:'#05f'}} /> : <CopyIcon />}</IconButton>
                {!compact && <IconButton onClick={onDelete}><DeleteIcon sx={{ color:'#f50'}} /></IconButton>}
            </Box>
        }>
            { compact ? <Tooltip title={prompt}>
            <ListItemText primary={formatPrompt(prompt)} sx={stylePrompt} />
        </Tooltip> : <ListItemText primary={<Typography sx={stylePrompt}>{prompt}</Typography>} />}
    </ListItem>
}

const styleItem = {
    m:1,
    px:2,
    boxShadow:'0 0 1px',
    borderRadius:2,
    width:'auto',
    mx:5
}

const stylePrompt = {
    fontStyle:'italic',
    width:'80%',
    overflow:'hidden'
}