const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product',
    {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editing: false,
    }
  );
};

exports.postNewProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const date = new Date();
  const formatter = new Intl.DateTimeFormat('sv-SE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(date);
  Product.create({
    title: title,
    price: price,
    description: description,
    imgUrl: imageUrl,
    date: formatter,
  })
    .then(result => {
      console.log(result.dataValues)
      res.render('./shop/product-detail', {
        pageTitle: result.dataValues.title,
        path: '/admin/products',
        product: result.dataValues
      })
    })
    .catch(err => {
      console.error(err);
    })
  
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product',
        {
          pageTitle: 'Edit Product',
          path: '/admin/edit-product',
          product: product,
          editing: editMode
        }
      );
    })
    .catch(err => {
      console.log(err);
    })
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imgUrl = updatedImageUrl;
      return product.save();
    })
    .then(result => {
      console.log('Updated product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.error(err);
    })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy()
    })
    .then(result => {
      console.log('Deleted product')
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.error(err);
    })
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products',
        {
          pageTitle: 'Admin Products',
          prods: products,
          path: '/admin/products'
        }
      );
    })
    .catch(err => {
      console.error(err);
    })
};