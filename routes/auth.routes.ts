import express from "express";
import { login, logout, refreshToken, register } from "../controllers/auth.controllers";
import { validLogin, validRegistration } from "../validators/auth";
import { authenticatedUser } from "../middleware/authN";

const router = express.Router();


/**
 * @swagger
 * /api/v1/auth/sign-up:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Registers a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: User object
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Email already exists
 */
router.post('/sign-up', validRegistration, register);

router.post('/sign-in', validLogin, login)

router.post('/sign-out', authenticatedUser, logout)

router.post('/refresh-token', refreshToken)



export default router