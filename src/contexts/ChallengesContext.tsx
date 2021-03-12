import {createContext, ReactNode, useEffect, useState} from 'react'
import challenges from '../../challenges.json'
import Cookies from 'js-cookie'
import { LevelUpModal } from '../components/LevelUpModal'
import { useSession } from 'next-auth/client'
import axios from 'axios'

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface ChallengesContextData {
    level: number, 
    levelUp: () => void , 
    currentExperience: number, 
    challengesCompleted: number, 
    startNewChallenge: () => void,
    activeChallenge: Challenge,
    resetChallenge: () => void,
    ExperienceToNextLevel: number,
    completeChallenge: () => void,
    closeLevelUpModal: () => void,
    totalExperience: number,
    isLearderboard: boolean, 
    closeLeaderBoard: () => void,
    activeLeaderBoard: () => void
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number, 
    currentExperience: number, 
    challengesCompleted: number
}

export const ChallengesContext = createContext({} as ChallengesContextData)


export function ChallengesProvider({children, ...rest}: ChallengesProviderProps){
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [totalExperience, setTotalExperience] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)
    const [ session, loading ] = useSession()
    const [isLearderboard, setIsLearderboard] = useState(false)

    const ExperienceToNextLevel = Math.pow(((level + 1) * 4), 2)
    const accessToken = session.accessToken

    useEffect(()=>{
        Notification.requestPermission()
    }, [])

    useEffect(()=>{
        if(loading){
            axios.post('/api/profile', {accessToken}).then(response => {
              setChallengesCompleted(response.data.challengesCompleted)
              setCurrentExperience(response.data.currentExperience)
              setTotalExperience(response.data.totalExperience)
              setLevel(response.data.level)
            })
        }else{
            if(level != 0 && currentExperience !=0 && challengesCompleted != 0 && totalExperience != 0){
                axios.post('/api/items', { accessToken, level, currentExperience, challengesCompleted, totalExperience})
            }
        }
       
        
    },  [level, currentExperience, challengesCompleted, totalExperience, loading])

    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelUpModalOpen(false)
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)

        new Audio('/public/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo Desafio', {
                body: 'Valendo ' + challenge.amount + 'xp'
            })
        }
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const {amount} = activeChallenge

        let finalExperience = currentExperience + amount 

        if(finalExperience >= ExperienceToNextLevel){
            finalExperience = finalExperience - ExperienceToNextLevel
            levelUp()
        }

        setCurrentExperience(finalExperience)
        setTotalExperience(totalExperience + amount)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)
    }

    function closeLeaderBoard(){
        setIsLearderboard(false)
    }

    function activeLeaderBoard(){
        setIsLearderboard(true)
    }

    return(
        <ChallengesContext.Provider value={{level, levelUp, currentExperience, challengesCompleted, startNewChallenge, activeChallenge, resetChallenge, ExperienceToNextLevel, completeChallenge, closeLevelUpModal, totalExperience, isLearderboard, closeLeaderBoard, activeLeaderBoard }}>
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}