const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin', 
    {
      pageTitle: 'Add Product', 
      path: '/admin/add-product'
    }
  );
};

exports.postNewProduct = (req, res, next) => {
  const product = new Product(req.body.prodTitle, req.body.prodPrice);
  product.save();
  res.redirect('/');
}

exports.getAllProducts = (req, res, next) => {
Product.fetchAllProducts((products) => {
  res.render('shop', 
    { 
      pageTitle: 'Candleaf', 
      prods: products, 
      path: '/' 
    }
  );
});
}