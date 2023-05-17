import { useEffect} from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Popup, Configuration } from './routes'

export default function App(){
    const navigate = useNavigate();
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    })
    useEffect(() => {
        const path = params.path
        switch (path) {
          case 'popup':
            navigate('/popup')
            break
          default:
            navigate('/')
            break
        }
      }, [])

    return(
        <Routes>
            <Route path='/' element='creado con React'/>
            <Route path='/popup' element={<Popup />} />
        </Routes>
    )
}