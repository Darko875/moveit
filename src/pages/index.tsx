import axios from "axios";
import React, { FormEvent} from "react";
import { useRouter } from 'next/router'
import Link from 'next/link';
import { GetServerSideProps } from "next";

import { signIn, signOut, useSession } from 'next-auth/client'




export default function Home() {
  const [ session, loading ] = useSession()
  
  return(
    <div>
      {!session ? (
        <button onClick={(): Promise<void> => signIn()}>
          <Link href="/dashboard">
            <a>
              Github
            </a>
          </Link>
        </button>
      ) : (
        <button>
          <Link href="/dashboard">
            <a>
              Bem-vindo à Move.it
            </a>
          </Link>
        </button>
      )
      }
      
    </div>
  )
}

