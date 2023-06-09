import { Typography, Box, Divider } from "@mui/material"
import { ListPrompts, FormPrompt } from "../../components"

export default function Configuration(){

    return <Box sx={{ width:'auto'}}>
        <Typography variant='h5' sx={{ textAlign:'center', m:2}}>Lista de Prompts</Typography>
        <ListPrompts/>
        <Divider sx={{ m:2 }}/>
        <FormPrompt />
    </Box>
}