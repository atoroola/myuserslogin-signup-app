const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const userSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true, 
    },
   
    password:{
        type: String,
        require: true, 
    },
    role:{
        type: String,
        require: true,
        enum: ['Teacher', 'Student',]
    }
});
userSchema.pre("save", function (){
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
});

userSchema.method("checkPassword", function (password){
    let valid = bcrypt.compareSync(password, this.password);
    return valid;
});

userSchema.method("generateToken", function () {
    let token = jwt.sign(
        {
            _id: this.id,
            email: this.email,
            role: this.role
        },
        process.env.JWT_SECRET,
        { issuer: "http://localhost:8686", expiresIn: "2h"}
    )
    return token;
});

const User = mongoose.model("User", userSchema);

module.exports= User;
