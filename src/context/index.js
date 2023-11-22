'use client'

const { createContext, useState } = require("react")

export const GlobalContext = createContext(null);

export const GlobalState = ({children}) =>{
    
const [idCount, setIdCount] = useState(0);
const [formCount, setFormCount] = useState(0);
let idCount2 = 0;
let formCount2 = 0;

    return(
    <GlobalContext.Provider value={{idCount,setIdCount,formCount,setFormCount,idCount2,formCount2}}>
        {children}
    </GlobalContext.Provider>
    )
}