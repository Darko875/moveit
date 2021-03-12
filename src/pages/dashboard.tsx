import { CompletedChallenges } from "../components/CompletedChallenges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperinceBar";
import { Profile } from "../components/Profile";
import {GetServerSideProps} from 'next'

import styles from '../styles/pages/Home.module.css';

import Head from 'next/head'
import { ChallengeBox } from "../components/ChallengeBox";
import {CountdownProvider} from '../contexts/CountdownContext'
import React, { useContext, useState } from "react";
import { ChallengesContext, ChallengesProvider } from "../contexts/ChallengesContext";
import { signIn, signOut, useSession } from 'next-auth/client'
import axios from "axios";
import { LearderboardComponent } from "../components/LearderboardComponent";
import { SideBar } from "../components/SideBar";

export default function dashboard() {
  const [ session, loading ] = useSession()
  const { level, closeLevelUpModal, isLearderboard } = useContext(ChallengesContext)
  const {challengesCompleted} = useContext(ChallengesContext)
  const {currentExperience, ExperienceToNextLevel} = useContext(ChallengesContext)
  

  return (
    <>
    {session && <>
      <ChallengesProvider level={level} currentExperience={currentExperience} challengesCompleted={challengesCompleted}>
        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>
          <ExperienceBar/>
          <CountdownProvider>
            <section className={styles.leftContainer}>
              <div>
                <Profile />
                <CompletedChallenges />
                <CountDown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
        <aside>
          <SideBar/>
        </aside>
      </ChallengesProvider>
    </>
    }
    </>
  )
}


