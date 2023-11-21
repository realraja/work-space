'use client'

const { createContext } = require("react")

export const GlobalContext = createContext(null);

export const GlobalState = ({children}) =>{
    
const [name, setName] = useState('');
setName('raja bindings');

    return(<>
    <GlobalContext.Provider value={name}>
        {children}
    </GlobalContext.Provider>
    </>)
}