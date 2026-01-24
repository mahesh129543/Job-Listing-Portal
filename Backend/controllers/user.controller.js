
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"



export  const register= async (req,res)=>{
    try {
        const {username,email, phoneNumber,password,role}=req.body;
        if(!username || !email || !phoneNumber || !password || !role){
            return res.status(400).json({
                message:"All fields are required"});
        }

        const userExists=await User.findOne({email});
        
        if(userExists){
            return res.status(400).json({
                message:"User already exists"});
        }

        const hashedPassword=await bcrypt.hash(password,10);

        await User.create({
            username,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            
        });

        res.status(201).json({message:"User registered successfully"});
        
    } catch (error) {
        
    }
}

export const login=async (req,res)=>{
        try {
            const {email,password,role}=req.body;
            if(!email || !password || !role){
                return res.status(400).json({
                    message:"All fields are required"});
            }
            let user=await User.findOne({email});
            if(!user){
                return res.status(400).json({
                    message:"User not found"});
            }
            const isPasswordCorrect=await bcrypt.compare(password,user.password);
            if(!isPasswordCorrect){
                return res.status(400).json({
                    message:"Invalid credentials"});
            }
            if(role!=user.role){
                return res.status(400).json({message:"Invalid credentials"});
            }
            const tokenData={
                userId:user._id
                
            }
            const token=await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:"1d"});
            user={
                _id:user._id,
                username:user.username,
                email:user.email,
                phoneNumber:user.phoneNumber,
                role:user.role,
                profile:user.profile
            }

            return res.status(200).cookie("token",token,
                {maxAge:24*60*60*1000,  httpOnly:true,sameSite:"strict",secure:true}).json(
                    {message:`Welcome Back ${user.username}  `});    

     



      } catch (error) {
            console.log(error);
            
        }
}


export const logout=(req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({message:"Logout successful"});
      
    } catch (error) {
        console.log(error);
        
    }
}

export const updateProfile=async (req,res)=>{
    try {
        const {username, email, phoneNumber, bio ,skills}=req.body;
        const file = req.file;
        
        let skillArray;
        if(skills){
            skillArray=skills.split(",");
        }

        
        const userId=req.id;
        let user=await User.findOne({userId});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        if(username)user.username=username;
        if(email)user.email=email;
        if(phoneNumber)user.phoneNumber=phoneNumber;
        if(bio)user.profile.bio=bio;
        if(skills)user.profile.skills=skillArray;
        if(file)user.profile.profilePic=file.path;




        
        await user.save();
        user={
                _id:user._id,
                username:user.username,
                email:user.email,
                phoneNumber:user.phoneNumber,
                role:user.role,
                profile:user.profile
            }
        return res.status(200).json({message:"Profile updated successfully"});
        
    } catch (error) {
        console.log(error);
    }
}