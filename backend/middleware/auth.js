const jwt =require("jsonwebtoken")

const authenticateToken =async (req, res, next) => {
    const token = req.header('Authorization');
    if (token == null) return res.status(401).send({message:"Token not found"});

      await jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) return res.status(403).send({message:"token invalid"});
        req.user = user;
        next();
    });
};


module.exports=authenticateToken

