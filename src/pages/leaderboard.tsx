import { LearderboardComponent } from "../components/LearderboardComponent";
import { useContext } from 'react'
import { SideBar } from "../components/SideBar";
import { ExperienceContext, ExperienceProvider } from "../contexts/ExperienceContext";


export default function Leaderboard() {
    const {user} = useContext(ExperienceContext)
    return(
        <ExperienceProvider user={user}>
            <div>
                <LearderboardComponent />
                <div>
                    <SideBar/>
                </div>
            </div>
        </ExperienceProvider>
    )
}