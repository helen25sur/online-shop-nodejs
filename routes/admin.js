const { join } = require('path');

const express = require('express');
const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.render('admin', {pageTitle: 'Add Product', path: '/admin/add-product'});
});

router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  products.push({title: req.body.prodTitle, price: req.body.prodPrice});
  res.redirect('/');
});

exports.routes = router;
exports.products = products;