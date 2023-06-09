import { Typography, Box, Divider, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { ListPrompts, FormPrompt } from "../../components"
import { useState } from "react"

export default function Popup(){
    const [create, setCreate] = useState(false)
    const navigate = useNavigate()

    const handlerOpenOptionsPage = () => {
        try{
            chrome.runtime.openOptionsPage()
        } catch(error){
            console.log(error)
            navigate('/configuration')
        }
    }

    return <Box sx={{ width:'auto', minWidth:'600px' }}>
        <Typography variant='h5' sx={{ textAlign:'center', m:2}}>Lista de Prompts</Typography>
        { create ? <FormPrompt notAllDelete onCreate={()=>setCreate(false)} /> : <ListPrompts compact/> }
        <Divider sx={{ m:2 }}/>
        <Box sx={{ display:'flex', flexDirection:'row', gap:3 }}>
            <Button variant='outlined' onClick={ () => setCreate(true) } disabled={create} sx={{ display:'flex', mx:'auto' }}>Agregar</Button>
            <Button variant='outlined' onClick={handlerOpenOptionsPage} sx={{ display:'flex', mx:'auto' }}>Administrar</Button>
        </Box>
    </Box>
}