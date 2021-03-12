import { MongoClient, ObjectId, ObjectID } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import {Mongoose, Schema, Types} from 'mongoose'

import connectToDatabase from '../../utils/database'
import { useSession } from 'next-auth/client';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    
    
    if (req.method === 'POST') {
        const {accessToken} = req.body
        if(!accessToken){
            return res.status(400).json('No access token')
        }

        const db = await connectToDatabase(process.env.DATABASE_URL)

        const collectionSession = db.collection('sessions')
        const collectionUsers = db.collection('users')

        const responseSession = await collectionSession.find({accessToken: accessToken}).toArray()
        const responseUser = await collectionUsers.findOne({ _id: Types.ObjectId(responseSession[0].userId) });

        return res.status(200).json(responseUser)
    }
}