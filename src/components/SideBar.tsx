import Link from 'next/link'
import React, { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Leaderboard.module.css'


export function SideBar(){
    const {closeLeaderBoard, activeLeaderBoard} = useContext(ChallengesContext)
    return(
        <div>
            <button><Link href="/dashboard"><a>Home</a></Link></button>
            <button><Link href="/leaderboard"><a>Leaderboard</a></Link></button>
        </div>
    )
}