const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[1];
    if (accessToken) {
        jwt.verify(accessToken, "masai", async(err, decoded) => {
            if (decoded) {
                console.log(decoded)
                const user = await userModel.findOne({_id:decoded.userId})
                console.log(user)
                req.user = user
                req.body.userId = decoded.userId
                req.body.username = user.name

                next();
            } else {
                res.json({ err :true,msg:"doesn't match"});
            }
        });
    } else {
        res.json({ msg: "Please login first." });
    }
}

module.exports ={
    auth
}
