import genToken from "../config/token.js"
import User from "../models/user.model.js"


export const googleAuth = async (req,res) => {
    try {
        const {name, email} = req.body 
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                name,
                email
            })
        }
        let token = await genToken(user._id)
        res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
});

        return res.status(200).json(user)


    } catch (error) {
return res.status(500).json({message:`Google auth ${error}`})        
    }
}

export const lagOut = async (req,res) => {
    try {
        await res.clearCookie("token")
        return res.status(200).json({message:"logOut successfully"})
    } catch (error) {
        return res.status(500).json({message:`Logout error ${error}`})
    }
}