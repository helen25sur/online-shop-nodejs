const bcryptjs = require('bcryptjs');
const User = require('../models/user');

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

exports.postRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then(user => {
      if (user) {
        // користувач з таким email вже існує
        console.log('User already exists');
        req.session.errorMessage = 'User with such email already exists';
        return req.session.save(() => res.redirect('/register'));
      }
      return bcryptjs.hash(password, 12)
        .then(hashedPassword => {
          return User.create({
            name: username,
            email: email,
            password: hashedPassword
          });
        })
        .then(user => {
          return user.getCart().then(cart => {
            if (!cart) {
              return user.createCart();
            }
            return cart;
          });
        })
        .then(result => {
          console.log(result.dataValues);
          req.session.successMessage = 'User created successfully';
          return req.session.save(() => res.redirect('/login'));
        });
    })
    .catch(err => console.error(err));
};
