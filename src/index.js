import ReactDOM from "react-dom"
import './locales/i18n'
import App from "./App"
import { HashRouter } from "react-router-dom"
import { ProviderStorage } from "./services/StorageService"


ReactDOM.render(
    <HashRouter>
        <ProviderStorage>
            <App />
        </ProviderStorage>
    </HashRouter>,
    document.getElementById('root')
)