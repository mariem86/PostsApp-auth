const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const isAuth = require("../middlewares/isAuth");
const serializeUser = require("../utils/serializeUser");
const {
  validator,
  registerRules,
  loginRules,
} = require("../middlewares/checkValidator");
const randomColor = require("../utils/randomColor");

//REGISTER

router.post("/register", registerRules(), validator, async (req, res) => {
  const { name, lastName, email, password } = req.body;
  const avatarColor = randomColor();
  try {
    //check if the user already Exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).send({ msg: "User already exists" });
    }
    //if all ok we create a user
    user = new User({ name, email, lastName, password, avatarColor });

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    user.password = hashPassword;

    await user.save();

    //then login the user
    const token = await jwt.sign({ userID: user.id }, process.env.SecretOrKey);
    res.status(200).send({
      msg: "Register Success",
      token,
      user: serializeUser(user),
    });
  } catch (error) {
    res.status(500).send({ msg: "Server err" });
  }
});

//LOGIN

router.post("/login", loginRules(), validator, async (req, res) => {
  const { email, password } = req.body;
  try {
    //fin the user by the email
    const user = await User.findOne({ email });
    //check if the user exists
    if (!user) {
      return res.status(401).send({ msg: "Bad Credentials" });
    }
    //if the user exists we compare password
    const isMatch = await bcrypt.compare(password, user.password); // return boolean
    if (!isMatch) {
      return res.status(401).send({ msg: "Password is invalid" });
    }
    //if evry thig is OK we log in the user
    const token = await jwt.sign({ userID: user.id }, process.env.SecretOrKey);
    res.status(200).send({
      msg: "Login Success",
      token,
      user: serializeUser(user),
    });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});

//AUTH USER

router.get("/me", isAuth, async (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    res.status(500).send({ msg: "Server Error" });
  }
});

module.exports = router;
