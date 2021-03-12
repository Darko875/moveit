import { useContext } from 'react'
import { ExperienceContext } from '../contexts/ExperienceContext'
import styles from '../styles/components/Leaderboard.module.css'



export function LearderboardComponent(){ 
    const {user} = useContext(ExperienceContext)
    return(
        <div>
            <table>
                <th>
                    
                    <td>Nome</td>
                    
                    <td>Desafios</td> 
                   
                    <td>Experiência</td>
                    
                </th>
                <tbody>
                    
                    {
                        user.map((user) => (
                            <tr>
                                <td>{user.name}</td>
                                <td>{user.challengesCompleted}</td>
                                <td>{user.totalExperience}</td>
                                </tr>
                        ))
                    }
                    

                </tbody>
            </table>
        </div>
    )
}