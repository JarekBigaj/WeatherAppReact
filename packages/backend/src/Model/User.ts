import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
    name: String,
    longitude: Number,
    latitude: Number
});

const userSchema = new mongoose.Schema({
    aws_client_id: String,
    name: String,
    favorite_cities: [citySchema]
})

export default mongoose.model('User', userSchema);