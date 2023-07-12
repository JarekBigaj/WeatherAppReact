import mongoose from 'mongoose';
import User from './Model/User'

mongoose.connect('mongodb://localhost/testWeatherDb').then(() => console.log('connected'));

const user = new User({aws_client_id:"123", name:"Jarek"});

export const createUser = () => {
    try{
        user.save().then(()=> console.log("User saved"))
    } catch(e){
        console.log(e);
    }
    
};