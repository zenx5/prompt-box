import { Typography, Box, Divider } from "@mui/material"
import { ListPrompts, FormPrompt } from "../../components"

export default function Popup(){

    return <Box sx={{ width:'auto', minWidth:'700px' }}>
        <Typography variant='h5' sx={{ textAlign:'center', m:2}}>Lista de Prompts</Typography>
        <ListPrompts />
        <Divider sx={{ m:2 }}/>
        <FormPrompt />
    </Box>
}