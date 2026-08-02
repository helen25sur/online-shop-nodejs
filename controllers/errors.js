exports.return404Error = (req, res, next) => {
  res.status(404).render('./errors/404',
    {
      pageTitle: 'Page Not Found',
      path: './errors/404',
      csrfToken: res.locals.csrfToken
    }
  );
}