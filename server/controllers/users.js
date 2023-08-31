import mongoose from 'mongoose';
import users from '../models/auth.js'

export const getAllUsers= async(req,res) =>{
    try {
        const allUsers= await users.find();
        const allUsersDetails=[]
        allUsers.forEach((users) => {
            allUsersDetails.push({ _id:users._id, name: users.name, about:users.about, tags: users.tags, joinedOn:users.joinedOn,})
        })
        console.log(allUsersDetails)
        res.status(200).json(allUsersDetails);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}