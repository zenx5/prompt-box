import { useTranslation } from "react-i18next"
import { Typography, Box, Divider, Button } from "@mui/material"
import { ChevronLeft } from "@mui/icons-material"
import { ListPrompts, FormPrompt } from "../../components"
import { useStorage } from "../../services/StorageService"
import BreadCrumbs from "../../components/BreadCrumbs"

export default function Configuration(){
    const { t:translate } = useTranslation()
    const { back, hasParent } = useStorage()

    return <Box sx={{ width:'auto'}}>
        <Typography variant='h5' sx={{ textAlign:'center', m:2}}>{translate('list_prompts')}</Typography>
        <BreadCrumbs />
        <ListPrompts/>
        <Divider sx={{ m:2 }}/>
        <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:2 }}>
            <Button variant='outlined' onClick={()=>back()} disabled={!hasParent}><ChevronLeft /></Button>
            <FormPrompt sx={{ width:'80%' }} />
        </Box>
        <Typography sx={{ textAlign:'center', fontWeight:'bold', mt:3 }}>Paypal: omartinez1618@gmail.com</Typography>
    </Box>
}