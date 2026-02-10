exports.getLogin = (req, res, next) => {

  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: isLoggedIn
  });
}

exports.postLogin = (req, res, next) => {

  res.redirect('/');
}