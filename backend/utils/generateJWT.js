import { response } from 'express'
import jwt from 'jsonwebtoken'

const generateJWT = (userID,response) => {
    const token = jwt.sign({userID},process.env.JWT_SECRET,{ expiresIn : '15d'})
    response.cookie('jwt',token,{
        maxAge : 15*24*60*60*1000,
        httpOnly : true,
        sameSite : 'strict',
        secure  : process.env.NODE_ENV !== 'Development'

    })
    
}
export default generateJWT