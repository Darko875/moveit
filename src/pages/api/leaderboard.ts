import connectToDatabase from '../../utils/database'
import { NextApiRequest, NextApiResponse } from 'next';


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const db = await connectToDatabase(process.env.DATABASE_URL)

    const collectionUsers = db.collection('users')

    const response = await collectionUsers.find().sort({totalExperience: -1}).toArray()

    return res.status(200).send(response)
}