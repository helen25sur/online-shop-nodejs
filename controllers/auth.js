const bcryptjs = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login'
  });
}

exports.postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then(user => {
      if (!user) {
        // такого email немає в БД
        console.log('User not found');
        return res.redirect('/login');
      }
      return bcryptjs.compare(password, user.password)
        .then(doMatch => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              if (err) console.log(err);
              res.redirect('/');
            });
          }
          // пароль неправильний
          console.log('Incorrect password');
          res.redirect('/login');
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
  res.render('auth/register', {
    pageTitle: 'Register',
    path: '/register'
  });
};

exports.postRegister = (req, res, next) => {
  const { username, email, password } = req.body;

  User.findOne({ where: { email: email } })
    .then(user => {
      if (user) {
        // користувач з таким email вже існує
        console.log('User already exists');
        return res.redirect('/register');
      }
      return bcryptjs.hash(password, 12)
        .then(hashedPassword => {
          return User.create({
            name: username,
            email: email,
            password: hashedPassword
          });
        })
        .then(result => {
          console.log(result.dataValues);
          res.redirect('/login');
        });
    })
    .catch(err => console.error(err));
};
