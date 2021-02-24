import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ContDown.module.css'

let countDownTimeout: NodeJS.Timeout

export function CountDown(){
    const {startNewChallenge} = useContext(ChallengesContext)

    const [time, setTime] = useState(0.1*60)
    const [isActive, setisActive] = useState(false)
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')    

    function startCountDown(){
        setisActive(true)
    }

    function resetCountDown(){
        clearTimeout(countDownTimeout)
        setisActive(false)
        setTime(0.1*60)
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