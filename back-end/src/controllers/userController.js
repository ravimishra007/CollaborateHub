require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userSchema } = require("../models/userModel");

const createUser = async (req, res) => {
  const {
    username,
    email,
    password,
    age,
    gender,
  } = req.body;
  const saltRounds = 10;
  try {
    const existingUser = await userSchema.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userCreated = await userSchema.create({
      username,
      email,
      age,
      gender,
      password: hashedPassword,
    });
    console.log(userCreated);
    return res.status(201).send({ error: false, data: userCreated });
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ error: true, message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await userSchema.findOne({ where: { email: email } });
    if (!checkUser) {
      return res.status(404).send({ message: "User not found" });
    }
    const match = await bcrypt.compare(password, checkUser.password);

    if (!match) {
      return res.status(404).send({ message: "credential not matched" });
    }

    let token = jwt.sign(
      {
        userId: checkUser.id,
      },
      process.env.SECRETKEY,
      { expiresIn: "24h" }
    );
    return res.status(200).send({
      message: "User login Successfully",
      data: { token: token, username: checkUser.username },
    });
  } catch (e) {
    res.status(500).send({ error: true, message: e.message });
  }
};


module.exports ={createUser,login}