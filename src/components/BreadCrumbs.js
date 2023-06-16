import { Box, ButtonBase, Typography } from "@mui/material";
import { useStorage } from "../services/StorageService";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function BreadCrumbs() {
    const { path, back, getBy } = useStorage()

    const joiner = (items, separator) => {
        return Array.from( Array(2*items.length - 1), (el, index) => index%2?separator:items[index/2] )
    }

    const handlerBack = (index) => {
        if( path.length>1 && index!=path.length-1 ){
            back( path.length - (index + 1) )
        }
    }

    return <Box sx={{ display:'flex', mx:5, p:0, alignItems:'center' }}>
        {joiner( path.map( (id, index) => {
            const name = getBy('name', 'id', id)
            return <ButtonBase key={id} sx={{ fontSize:'1.3rem' }} onClick={()=>handlerBack(index)}>{name ?? 'Root'}</ButtonBase>
        } ), <ChevronRight />)}
    </Box>
}