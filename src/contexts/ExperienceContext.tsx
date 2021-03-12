import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";



interface ExperienceContextData {
    user
}

interface ExperienceProviderProps {
    children: ReactNode,
    user
}

export const ExperienceContext = createContext({} as ExperienceContextData)

export function ExperienceProvider({children, ...rest}: ExperienceProviderProps){
    const [user, setUser] = useState([])

    useEffect(() => {
        axios.get('/api/leaderboard').then(res => {
            setUser(res.data)
            console.log(res.data)
        })
    })

    return(
        <ExperienceContext.Provider value={{user}}>
            {children}
        </ExperienceContext.Provider>
    )
}