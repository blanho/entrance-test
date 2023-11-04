import { NextFunction, Request, Response } from "express";
import db from "../config/database";
import bcrypt from "bcrypt";
import CustomError from "../utils/errorHandler";
import { ILogin, IReqAuth, IUserRequest, IUserResponse } from "../models/user";
import { attchJWTtoCookies, verifyRefreshTokenJwt } from "../utils/jwt";
import crypto from "crypto"
import { IDecodedRefreshToken, ITokenResponse } from "../models/token";


const register = async (req: Request<IUserRequest>, res: Response, next: NextFunction) => {
  const { firstName, lastName, email, password } = req.body;

  const existingUser = await db("users").where("email", email).first();
  if (existingUser) {
    return next(new CustomError("Email already exists", 400, req.path))
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  
  const [newUserId] = await db("users").insert({
    firstName,
    lastName,
    email,
    hash: hashedPassword,
  });

  const newUser = {
    id: newUserId,
    firstName,
    lastName,
    email,
    displayName: `${firstName} ${lastName}`
  }

  res.status(201).json(newUser);
}

const login = async (req: Request<ILogin>, res: Response, next: NextFunction) => {
  const { email, password} = req.body;
  const user: IUserResponse = await db("users").where("email", email).first();

  if (!user || !(await bcrypt.compare(password, user.hash))) {
    return next(new CustomError('Invalid Credentials', 401, req.path));
  }

  const existingToken: ITokenResponse = await db("tokens").where("userId", user.id).first()

  if (existingToken  && new Date(existingToken.expiresIn) >= new Date()) {
    const { accessTokenJWT, refreshTokenJWT } = attchJWTtoCookies(res, { sub: user.id }, existingToken.refreshToken);
    return res.status(200).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token: accessTokenJWT,
      refreshToken: refreshTokenJWT
    })
  }

  const refreshToken = crypto.randomBytes(60).toString("hex");
  const oneMonth = 1000 * 60 * 60 * 24 * 30
  const expiresIn = new Date(Date.now() + oneMonth).toISOString();

  await db("tokens").insert({ refreshToken, expiresIn, userId: user.id });

  const { accessTokenJWT, refreshTokenJWT } = attchJWTtoCookies(res, { sub: user.id }, refreshToken);
  res.status(200).json({
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      displayName: `${user.firstName} ${user.lastName}`
    },
    token: accessTokenJWT,
    refreshToken: refreshTokenJWT
  })
  
}


const logout = async (req: IReqAuth, res: Response) => {
  await db("tokens").where("userId", req?.user?.id).delete()

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date()
  })

  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date()
  })

  res.status(204).send()
}

const refreshToken = async (req: IReqAuth, res: Response, next: NextFunction) => {
  try {
    const payload = verifyRefreshTokenJwt(req.body.refreshToken) as IDecodedRefreshToken
    if (!payload) {
      next(new CustomError("Refresh Token doesn't exist", 404, req.path))
    }
    
    const existingToken: ITokenResponse = await db('tokens').where('userId', payload.user.sub).andWhere('refreshToken', payload.refreshToken).first()
    if (!existingToken || new Date(existingToken.expiresIn) < new Date()) {
      next(new CustomError("Unauthenticated user", 401, req.path))
    }
    
    const { accessTokenJWT, refreshTokenJWT } = attchJWTtoCookies(res, { sub: payload.user.sub }, existingToken.refreshToken);
  
    res.status(200).json({
      token: accessTokenJWT,
      refreshToken: refreshTokenJWT
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    next(new CustomError("Unauthenticated user", 401, req.path))
  }
}

export { register, login, logout, refreshToken };
