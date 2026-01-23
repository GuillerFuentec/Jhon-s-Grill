'use client'

import { useContext, createContext, useState } from "react"

const navContext = createContext(null); 

export function NavProvider ({children}) {
    const [rout, setRout] = useState(null)

    const navigation = (rout)
}