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