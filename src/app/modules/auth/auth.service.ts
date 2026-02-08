import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import db from '../../../config/db';
import { jwtHelpers } from '../../../config/jwt';
import AppError from '../../errors/AppError';
import { IHrUser, ILoginRequest, ILoginResponse } from './auth.types';

class AuthService {
  async login(payload: ILoginRequest): Promise<ILoginResponse> {
    const { email, password } = payload;

    
    const user = await db<IHrUser>('hr_users')
      .where({ email })
      .first();

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordMatched) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = jwtHelpers.signToken(jwtPayload);

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}


export const authService = new AuthService();