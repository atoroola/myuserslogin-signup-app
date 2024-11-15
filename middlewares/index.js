const jwt = require("jsonwebtoken");

const isTokenValid = (req, res, next) => {
    try {
        const longToken = req.headers.authorization;
        if (!longToken) {
            res.status(401).json({ message: "token not present"});
        }else {
            const token = longToken.split(" ")[1];
            let user = jwt.verify(token, process.env.JWT_SECRET);
            console.log(user);
            req.user = user;
            next();
        }
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "invalid token"});
        
    }
};


const isStudent = (req, res, next) => {
    try {
        const longToken = req.headers.authorization;
        if (!longToken) {
            res.status(401).json({ message: "token not present"});
        }else {
            const token = longToken.split(" ")[1];
            let user = jwt.verify(token, process.env.JWT_SECRET);
            if(user.role !== "Student" ){
                res.status(403).json({message: "only student are authorized"});
            }else{
                user.role !==( "Student");
            console.log(user);
            req.user = user;
            next();
        } }
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "invalid token"});
        
    }
};

const isTeacher = (req, res, next) => {
    try {
        const longToken = req.headers.authorization;
        if (!longToken) {
            res.status(401).json({ message: "token not present"});
        }else {
            const token = longToken.split(" ")[1];
            let user = jwt.verify(token, process.env.JWT_SECRET);
            if(user.role !== "Teacher" ){
                res.status(403).json({message: "only Teacher's are authorized"});
            }else{
                user.role !==( "Teacher");
            console.log(user);
            req.user = user;
            next();
        } }
        
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "invalid token"});
        
    }
};

module.exports = { isTokenValid , isStudent , isTeacher};