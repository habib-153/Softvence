"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import { IUser } from "../types";
import envConfig from "../config/envConfig";

export const updateAccessTokenInCookies = (updatedUser: IUser) => {
  const secret = envConfig.jwt_access_secret;
  const expiresIn = envConfig.jwt_access_expires_in

  if (!secret) {
    throw new Error("JWT secret is not defined");
  }

  if (!expiresIn) {
    throw new Error("JWT expiration is not defined or invalid");
  }

  try {
    // @ts-ignore
    const newAccessToken = jwt.sign(
      {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        status: updatedUser.status,
      },
      secret,
      { expiresIn: expiresIn }
    );


    const oldAccessToken = cookies().get("accessToken")?.value;

    if (oldAccessToken) {
      cookies().delete("accessToken");
    }

    cookies().set("accessToken", newAccessToken);
  } catch (error) {
    //console.error("Error signing JWT: ", error);
  }
};