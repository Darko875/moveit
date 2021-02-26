import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/ContDown.module.css'


export function CountDown(){
    const {minutes, seconds, hasFinished, isActive, resetCountDown, startCountDown} = useContext(CountdownContext)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')    

    

    return(
        <div>
            <div className={styles.CountDownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            {hasFinished ? (
                <button disabled type="button" className={styles.countdownButton} >
                    Ciclo Encerrado
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button type="button" className={`${styles.countdownButton} ${styles.countdownButtonActive}`} onClick={resetCountDown}>
                            Abandonar um Ciclo
                        </button>
                    ) : 
                    (
                        <button type="button" className={styles.countdownButton} onClick={startCountDown}>
                            Iníciar o Ciclo
                        </button>
                    )}
                </>
            )
            }

            
            
        </div>
    )
}