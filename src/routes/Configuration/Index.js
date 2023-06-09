import { useTranslation } from "react-i18next"
import { Typography, Box, Divider } from "@mui/material"
import { ListPrompts, FormPrompt } from "../../components"

export default function Configuration(){
    const { t:translate } = useTranslation()

    return <Box sx={{ width:'auto'}}>
        <Typography variant='h5' sx={{ textAlign:'center', m:2}}>{translate('list_prompts')}</Typography>
        <ListPrompts/>
        <Divider sx={{ m:2 }}/>
        <FormPrompt />
    </Box>
}