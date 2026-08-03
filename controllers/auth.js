const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require('sequelize');

const User = require('../models/user');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.getLogin = (req, res, next) => {
  const errorMessage = req.session.errorMessage;
  req.session.errorMessage = null;
  const successMessage = req.session.successMessage;
  req.session.successMessage = null;

  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    csrfToken: res.locals.csrfToken,
    errorMessage: errorMessage,
    successMessage: successMessage
  });
}

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        // такого email немає в БД
        console.log('User not found');
        req.session.errorMessage = 'User with such email not found';
        return req.session.save(() => res.redirect('/login'));
        // return res.redirect('/login');
      }
      return bcryptjs.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(() => res.redirect('/'));
          }
          // пароль неправильний
          console.log('Incorrect password');
          req.session.errorMessage = 'Incorrect password';
          return req.session.save(() => res.redirect('/login'));
        });
    })
    .catch(err => console.error(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) console.log(err);
    res.redirect('/');
  });
};

exports.getRegister = (req, res, next) => {
  const errorMessage = req.session.errorMessage;
  req.session.errorMessage = null;
  const successMessage = req.session.successMessage;
  req.session.successMessage = null;

  res.render('auth/register', {
    pageTitle: 'Register',
    path: '/register',
    csrfToken: res.locals.csrfToken,
    errorMessage: errorMessage,
    successMessage: successMessage
  });
};

exports.postRegister = async (req, res, next) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ where: { email: email } });
  if (existingUser) {
    console.log('User already exists');
    req.session.errorMessage = 'User with such email already exists';
    return req.session.save(() => res.redirect('/register'));
  }

  try {
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = await User.create({
      name: username,
      email: email,
      password: hashedPassword
    });
    const cart = await user.getCart();
    if (!cart) {
      await user.createCart();
    }
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Signup is successful",
      html: `<h1>Welcome!</h1>
              <p>${user.name}, nice to see you in our community!</p>
              <p>We hope, you'll be satisfied!</p>`
    });
    req.session.successMessage = 'User created successfully';
    return req.session.save(() => res.redirect('/login'));
  } catch (err) {
    console.error(err);
    req.session.errorMessage = 'An error occurred during registration';
    return req.session.save(() => res.redirect('/register'));
  }
}


exports.getResetPassword = (req, res, next) => {
  const errorMessage = req.session.errorMessage;
  req.session.errorMessage = null;
  const successMessage = req.session.successMessage;
  req.session.successMessage = null;
  res.render('auth/reset', {
    pageTitle: 'Reset Password',
    path: '/reset-password',
    csrfToken: res.locals.csrfToken,
    errorMessage: errorMessage,
    successMessage: successMessage
  });
};

exports.postResetPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      console.log('User not found');
      req.session.errorMessage = 'User with such email not found';
      return req.session.save(() => res.redirect('/reset-password'));
    }
    const token = crypto.randomBytes(20).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
    await user.save();
    console.log('Saved reset token:', user.resetToken);
    console.log('Expiry:', user.resetTokenExpiry);

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `<h1>Password Reset</h1>
              <p>${user.name}, you have requested a password reset.</p>
              <p>Please click the link below to reset your password:</p>
              <a href="http://localhost:3000/reset-password/${token}">Reset Password</a>
              <p>If you did not request this, please ignore this email.</p>`
    });
    req.session.successMessage = 'Password reset email sent';
    return req.session.save(() => res.redirect('/login'));

  } catch (err) {
    console.error(err);
    req.session.errorMessage = 'An error occurred during password reset';
    return req.session.save(() => res.redirect('/reset-password'));
  }
}

exports.getNewPassword = async (req, res, next) => {
  const token = req.params.token;
  const errorMessage = req.session.errorMessage;
  req.session.errorMessage = null;
  const successMessage = req.session.successMessage;
  req.session.successMessage = null;
  try {
    const user = await User.findOne({ where: { resetToken: token, resetTokenExpiry: { [Op.gt]: Date.now() } } });
    if (!user) {
      console.log('Invalid or expired token');
      req.session.errorMessage = 'Invalid or expired token';
      return req.session.save(() => res.redirect('/reset-password'));
    }
    res.render('auth/new-password', {
      pageTitle: 'Reset Password',
      path: '/reset/:token',
      csrfToken: res.locals.csrfToken,
      token: token,
      errorMessage: errorMessage,
      successMessage: successMessage,
      userId: user.id
    });
  } catch (err) {
    console.error(err);
  }
}

exports.postNewPassword = async (req, res, next) => {
  const { password, confirmPassword, userId, token } = req.body;
  if (String(password).trim() !== String(confirmPassword).trim()) {
    req.session.errorMessage = "The passwords don't match!";

    return req.session.save(() => {
      res.redirect(`/reset-password/${token}`);
    });
  }

  try {
    const user = await User.findOne({ where: { id: userId } });
    const hashedPassword = await bcryptjs.hash(password, 12);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();
    req.session.successMessage = 'Password has been reset successfully';
    return req.session.save(() => res.redirect('/login'));
  } catch (err) {
    console.error(err);
    req.session.errorMessage = 'An error occurred during saving new password';
    return req.session.save(() => res.redirect('/reset-password'));
  }

}