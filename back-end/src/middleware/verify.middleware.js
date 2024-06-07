const jwt=require('jsonwebtoken')
const {UserModel}=require('../model/user.model')

const verify=async (req,res,next)=>{
    const token=res.headers.authorization?.split(" ")[1]
    try{
        const decoded=await jwt.verify(token,'token')
        if(decoded)
        {
            const user=await UserModel.findOne({email:decoded.email})
            if(user.verify===true)
            {
                next()
            }
            else{
                res.status(200).json({msg:'verify first'})
            }
        }else{
            res.status(200).json({msg:'you are not authorised'})
        }
    }
    catch(err)
    {
        res.status(400).json({error:err})
    }
}

module.exports={
    verify
}