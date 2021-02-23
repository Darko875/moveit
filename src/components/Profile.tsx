import styles from '../styles/components/Profile.module.css'

export function Profile(){
    return(
    <div className={styles.profileContainer}>
        <img src="https://github.com/darko875.png" alt="Daniel Sá"/>
        <div>
            <strong>Daniel Sá</strong>
            <p>
                <img src="icons/level.svg" alt=""/>
                Level 1
            </p>
        </div>
    </div>
    )
}