import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import { ChallengesContext } from './ChallengesContext'

interface CountdownContextData {
    minutes: number, 
    seconds: number, 
    hasFinished: boolean, 
    isActive: boolean, 
    startCountDown: () => void, 
    resetCountDown: () => void,
}

interface CountdownProviderProps {
    children: ReactNode;
}


export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider({children}: CountdownProviderProps){

    let countDownTimeout: NodeJS.Timeout

    const {startNewChallenge} = useContext(ChallengesContext)

    const [time, setTime] = useState(25*60)
    const [isActive, setisActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    function startCountDown(){
        setisActive(true)
    }

    function resetCountDown(){
        clearTimeout(countDownTimeout)
        setisActive(false)
        setHasFinished(false)
        setTime(25*60)
    }

    useEffect(() => {
        if(isActive && time > 0){
            countDownTimeout = setTimeout(()=>{
                setTime(time-1)
            }, 1000)
        } else if(isActive && time === 0){
            setHasFinished(true)
            setisActive(false)
            startNewChallenge()
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{minutes, seconds, hasFinished, isActive, startCountDown, resetCountDown}}>
            {children}
        </CountdownContext.Provider>
    )
}