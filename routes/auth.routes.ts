import express from "express";
import { login, logout, refreshToken, register } from "../controllers/auth.controllers";
import { validLogin, validRegister } from "../validators/auth";
import { authenticatedUser } from "../middleware/authN";

const router = express.Router();

router.post('/sign-up', validRegister, register);

router.post('/sign-in', validLogin, login)

router.post('/sign-out', authenticatedUser, logout)

router.post('/refresh-token', refreshToken)


export default router