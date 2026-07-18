import { request } from "express";
import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true 
},
email:{
    type:String,
    unique:true,
    request:true
},
credits:{
    type:Number,
    default:1000
}

},{timeseries:true})

const User = mongoose.model("User", userSchema)

export default User