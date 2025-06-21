import jwt from 'jsonwebtoken';
import LoginModel from '../models/loginModel.js';

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await LoginModel.login(username, password);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { adminId: user.adminid },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        adminId: user.adminid,
        username: user.username,
        name: user.employeename,
        email: user.email
      }
    });
  } catch (err) {
    next(err);
  }
};

export default { login };
