const express = require('express');
const { createUser, login, getAllUsers } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.get('/users', getAllUsers);
userRouter.post('/register', createUser);
userRouter.post('/login',login);

module.exports = {userRouter}