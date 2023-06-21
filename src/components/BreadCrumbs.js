import { useState } from "react";
import { Box, ButtonBase, Button } from "@mui/material";
import { ChevronRight, Download, Upload } from "@mui/icons-material";
import { MuiFileInput } from 'mui-file-input'
import { useStorage } from "../services/StorageService";

export default function BreadCrumbs() {
    const [value, setValue] = useState(null)
    const { path, back, getBy, exportData, importData } = useStorage()

    const joiner = (items, separator) => {
        return Array.from( Array(2*items.length - 1), (el, index) => index%2?separator:items[index/2] )
    }

    const handlerBack = (index) => {
        if( path.length>1 && index!=path.length-1 ){
            back( path.length - (index + 1) )
        }
    }

    const handlerDownload = () => {
        exportData()
    }

    const handlerUpload = () => {
        const inputFile = document.querySelector('input[type=file]')
        inputFile.click()
    }

    const handlerChangeUpload = async (newValue) => {
        const data = JSON.parse( await newValue.text() )
        importData(data)
    }

    return <Box sx={{ display:'flex', mx:5, p:0, alignItems:'center', justifyContent:'space-between' }}>
        <Box sx={{ display:'flex', mx:0, p:0, alignItems:'center' }}>
        {joiner( path.map( (id, index) => {
            const name = getBy('name', 'id', id)
            return <ButtonBase key={`path-${id}`} sx={{ fontSize:'1.3rem' }} onClick={()=>handlerBack(index)}>{name ?? 'Root'}</ButtonBase>
        } ), <ChevronRight />)}
        </Box>
        <Box sx={{ display:'flex', gap:1 }}>
            <MuiFileInput id="up" sx={{display:'none'}} value={value} onChange={handlerChangeUpload} />
            <Button
                variant="outlined"
                startIcon={<Upload color="primary"/>}
                onClick={handlerUpload}>
                Import
            </Button>
            <Button
                variant="outlined"
                startIcon={<Download color="primary"/>}
                onClick={handlerDownload}>
                Export
            </Button>
        </Box>
    </Box>
}