exports.getLogin = (req, res, next) => {
  const isLoggedIn = req.get('Cookie').split(';')[5].trim().split('=')[1] === 'true';
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: isLoggedIn
  });
}

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=100; HttpOnly'); // Expires in 100 seconds. HttpOnly means that the cookie cannot be accessed by client-side JavaScript, which helps to prevent cross-site scripting (XSS) attacks.
  res.redirect('/');
}