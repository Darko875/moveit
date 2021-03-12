
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import {NextApiRequest, NextApiResponse} from 'next'


const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    
  ],
  database: process.env.DATABASE_URL,
}

export default (req: NextApiRequest, res: NextApiResponse):Promise<void> => NextAuth(req, res, options)