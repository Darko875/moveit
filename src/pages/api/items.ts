import { NextApiRequest, NextApiResponse } from 'next';
import {Mongoose, Schema, Types} from 'mongoose'

import connectToDatabase from '../../utils/database'
import { useSession } from 'next-auth/client';


export default async (req: NextApiRequest, res: NextApiResponse) => {

    if(req.method == 'POST'){
        const {accessToken} = req.body
        const {
            level,
            currentExperience,
            challengesCompleted,
            totalExperience
        } = req.body

        if(!accessToken){
            return res.status(400).json('No access token')
        }

        const db = await connectToDatabase(process.env.DATABASE_URL)

        const collectionSession = db.collection('sessions')
        const collectionUsers = db.collection('users')

        const responseSession = await collectionSession.find({accessToken: accessToken}).toArray()

        await collectionUsers.updateOne({_id: Types.ObjectId(responseSession[0].userId)},
        {$set: {
            level,
            currentExperience,
            challengesCompleted,
            totalExperience
        }})

        return res.status(200).send({success: true})
    }
}