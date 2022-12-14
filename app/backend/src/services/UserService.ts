import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import IPayloadUser from '../interfaces/IPayloadUser';
import User from '../database/models/User';
import Jwt from '../utils/Jwt';

export default class UserService {
  public login = async (payloadUser: IPayloadUser) => {
    if (!payloadUser.email || !payloadUser.password) {
      return { message: { message: 'All fields must be filled' }, statusCode: 400 };
    }

    const user = await User.findOne({ where: { email: payloadUser.email } });

    if (user !== null) {
      const isValidPassword = await bcrypt.compare(payloadUser.password, user.password);
      const payload = {
        id: user.id,
        email: user.email,
      };

      return isValidPassword ? { message: { token: Jwt.generateJwt(payload) }, statusCode: 200 }
        : { message: { message: 'Incorrect email or password' }, statusCode: 401 };
    } return { message: { message: 'Incorrect email or password' }, statusCode: 401 };
  };

  public validate = async (payload: JwtPayload) => {
    const user = await User.findByPk(payload.id);
    return { statusCode: 200, message: { role: user?.role } };
  };
}
