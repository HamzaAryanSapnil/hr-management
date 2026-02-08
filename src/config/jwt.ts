import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { env } from './env';

export interface JwtPayload {
  id: number;
  email: string;
  name: string;
}

export const signToken = (payload: JwtPayload): string => {
  const secret: Secret = env.JWT_SECRET as Secret;
  const options: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as string,
  } as SignOptions;

  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.JWT_SECRET) as JwtPayload;
};

export const jwtHelpers = {
  signToken,
  verifyToken,
};