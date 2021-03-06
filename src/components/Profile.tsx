import {  signIn, signOut, useSession } from 'next-auth/client'
import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/Profile.module.css'



export function Profile(){
    const [ session, loading ] = useSession()
    const {level} = useContext(ChallengesContext)

    return(
        <>
        {!session && <>
            Not signed in <br/>
            <button onClick={() => signIn()}>Sign in</button>
          </>}
        {session && <>
            <div className={styles.profileContainer}>
                <img src={session.user.image} alt={session.user.name}/>
                <div>
                    <strong>{session.user.name}</strong>
                    <p>
                        <img src="icons/level.svg" alt=""/>
                        Level {level}
                    </p>
                </div>
            </div>
        </>}
        </>
    )
}