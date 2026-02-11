const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login'
  });
}

exports.postLogin = (req, res, next) => {
  User.findByPk(1) // Знаходимо юзера
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user; // Зберігаємо дані в сесію

      // Важливо: зберігаємо сесію перед редіректом, щоб уникнути багів
      req.session.save(err => {
        if (err) console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.error(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};