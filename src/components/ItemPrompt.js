import { Box, IconButton, ListItem, ListItemText, Tooltip, Typography } from '@mui/material'
import { Delete as DeleteIcon, CopyAll as CopyIcon, Check as CheckIcon, Visibility, VisibilityOff, ChevronRight, Edit } from '@mui/icons-material';

import { useState } from 'react'
import { useStorage } from '../services/StorageService';

export default function ItemPrompt({ prompt, compact, onDelete }) {
    const [hidden, setHidden] = useState(true)
    const [copy, setCopy] = useState(false)
    const { go, current, setCurrent } = useStorage()

    const formatPrompt = (prompt) => {
        if( hidden ) return prompt.name
        return prompt.content
    }

    const handlerVisibility = () => {
        setHidden( prev => !prev )
    }

    const handlerOpenFolder = () => {
        go(prompt.id)
    }

    const handlerCopy = () => {
        try{
            const promptElement = document.createElement('textarea');
            promptElement.value = prompt.content;
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
                {prompt.hidden && <IconButton onClick={handlerVisibility}>{ hidden ? <VisibilityOff /> : <Visibility /> }</IconButton> }
                {prompt.type==='prompt' && <IconButton onClick={handlerCopy}>{ copy ? <CheckIcon sx={{ color:'#05f'}} /> : <CopyIcon />}</IconButton>}
                {prompt.type==='folder' && <IconButton onClick={handlerOpenFolder}>{ <ChevronRight />  }</IconButton>}
                {!compact && <IconButton disabled={!!current} onClick={()=>setCurrent(prompt.id)}><Edit sx={{ color:!!current?'#aaa':'#05f'}} /></IconButton>}
                {!compact && <IconButton disabled={!!current} onClick={onDelete}><DeleteIcon sx={{ color:!!current?'#aaa':'#f50'}} /></IconButton>}
            </Box>
        }>
            { compact ? 
                <Tooltip title={prompt.name}>
                    <ListItemText 
                        sx={stylePrompt}
                        primary={formatPrompt(prompt)}
                        secondary={!prompt.hidden && prompt.content }
                    />
                </Tooltip> :
                <ListItemText
                    primary={<Typography sx={stylePrompt}>{prompt.name==='' ? (hidden ? Array(prompt.content.length).fill('*') : prompt.content) : prompt.name }</Typography>} 
                    secondary={ prompt.name!=='' && <Typography sx={stylePrompt}>{ prompt.hidden ? ( hidden ? Array(prompt.content.length).fill('*') : prompt.content ) : prompt.content}</Typography>} 
                />
            }
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