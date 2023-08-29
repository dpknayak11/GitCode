const jwt = require("jsonwebtoken");
const User = require('../model/userModel');
const userAuthenticate = async (req, res, next) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRBbHI5cjN3RDRkUHRwc0RBZHRFa0NlYnpYeWh6aHZOWFhCNmFTQmVJTXJCeFYvNVdGL2RwNiIsImlhdCI6MTY5MzI4OTg1NX0._SjYr8ACKJqZHqSvn_joUKLDs6Ccujad_GMhCfbxQH4"
    // const token = req.header('Authorization');
    console.log("Token auth: ", token);
    if (!token) { return res.status(401).json({ message: "Unauthorized users" }) }

    const user = jwt.verify(token, 'secret')
    console.log('auth userId: ', user.userId);
    try {
        const resUser = await User.findByPk(user.userId);
        if (!resUser.id) { return res.status(403).json({ message: "primary key not found" }); }
        else {
            console.log('auth resUserId : ', resUser.id);
            req.user = resUser
            next();
        }
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: "Token is not valid" });
    }
}

module.exports = userAuthenticate;