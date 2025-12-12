import jwt from "jsonwebtoken";
import authConfig from "../config/auth";
import User from "../models/User";

export const createAccessToken = (user: User): string => {
  const { secret, expiresIn } = authConfig;

  // @ts-ignore - JWT typing compatibility
  return jwt.sign(
    {
      usarname: user.name,
      profile: user.profile,
      id: user.id,
      companyId: user.companyId
    },
    secret,
    {
      expiresIn
    }
  );
};

export const createRefreshToken = (user: User): string => {
  const { refreshSecret, refreshExpiresIn } = authConfig;

  // @ts-ignore - JWT typing compatibility
  return jwt.sign(
    { id: user.id, tokenVersion: user.tokenVersion, companyId: user.companyId },
    refreshSecret,
    {
      expiresIn: refreshExpiresIn
    }
  );
};
