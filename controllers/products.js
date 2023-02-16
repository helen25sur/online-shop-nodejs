const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render('admin', 
    {
      pageTitle: 'Add Product', 
      path: '/admin/add-product'
    }
  );
};

exports.postNewProduct = (req, res, next) => {
  products.push( 
    {
      title: req.body.prodTitle, 
      price: req.body.prodPrice
    });
  res.redirect('/');
}

exports.getAllProducts = (req, res, next) => {
  console.log(products);
  res.render('shop', 
    { 
      pageTitle: 'Candleaf', 
      prods: products, 
      path: '/' 
    }
  );
}