
import { Response } from "express";
import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = process.env;

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, `${ACCESS_TOKEN_SECRET_KEY}`);
};


export const verifyAccessTokenJwt = (payload: string) => {
    return jwt.verify(payload, `${ACCESS_TOKEN_SECRET_KEY}`)
}

export const verifyRefreshTokenJwt = (payload: string) => {
  return jwt.verify(payload, `${REFRESH_TOKEN_SECRET_KEY}`)
}

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, `${REFRESH_TOKEN_SECRET_KEY}`);
};

export const attchJWTtoCookies = (res: Response, payload: object, refreshToken: string) => {
  console.log(payload)
  const accessTokenJWT = generateAccessToken(payload)
  const refreshTokenJWT = generateRefreshToken({
    user: {...payload },
    refreshToken
  })

  const oneHour = 1000 * 60 * 60
  const oneMonth = 1000 * 60 * 60 * 24 * 30;

  res.cookie("accessToken", accessTokenJWT, {
    expires: new Date(Date.now() + oneHour),
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
  })

  res.cookie("refreshToken", refreshTokenJWT, {
    expires: new Date(Date.now() + oneMonth),
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === "production",
  })

  return {
    accessTokenJWT,
    refreshTokenJWT
  }

}


