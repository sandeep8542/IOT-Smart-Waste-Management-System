const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);


/* GOOGLE LOGIN */

router.get(
"/google",
passport.authenticate("google",{scope:["profile","email"]})
);


/* GOOGLE CALLBACK */

router.get(
"/google/callback",
passport.authenticate("google", { session: false }),
(req,res)=>{

const token = jwt.sign(
{id:req.user._id},
process.env.JWT_SECRET,
{expiresIn:"1d"}
);

res.redirect(`http://localhost:5173/oauth-success?token=${token}`);

}
);


/* GITHUB LOGIN */

router.get(
"/github",
passport.authenticate("github",{scope:["user:email"]})
);


/* GITHUB CALLBACK */

router.get(
"/github/callback",
passport.authenticate("github", { session: false }),
(req,res)=>{

const token = jwt.sign(
{
id:req.user._id,
name:req.user.name,
email:req.user.email
},
process.env.JWT_SECRET,
{expiresIn:"1d"}
);

res.redirect(`http://localhost:5173/oauth-success?token=${token}`);

}
);

module.exports = router;