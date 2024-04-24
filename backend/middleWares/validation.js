import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

const vallidation = async (req,res,next)=>{
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({ error: "Unauthorised user" });
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({ error: "Invalid token" })
        }
        const user = await User.findOne({_id : decode.userID}).select("-password")
        if(!user){
            return res.status(401).json({ error: "User does not exist" });
        }
        req.user = user
        next()
    } catch (error) {
        console.log("Error in vallidation middleware", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}
export default vallidation