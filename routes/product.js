var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var upload = require("express-fileupload");
var fs = require('fs');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "my_db"
});

con.connect(function(err){
  if (err) throw err;
  console.log("Connected");
});
/* GET home page. */

router.get('/new', function(req, res) {
  con.query("SELECT * FROM product", function (err, result, fields) {
    var error = {};
    var success = {};
    res.render('product', {title: express, result: result,success,error});
  });
});

// router.post('/new', function(req, res){
  
// });

router.get('/res', function(req, res) {
  console.log("hi");
  con.query("SELECT * FROM product", function (err, result, fields) {
    res.render('res', {title: express, result: result});
  });
});

router.post('/res',function(req,res)
{

  var alpha = /^[a-zA-Z]+$/;
  var error = {};
  var success = {};
  if(req.body.firstname=="")
  {
    error['product_name'] = "Product name cannot be empty";
  }
  else if(!req.body.firstname.match(alpha))
  {
    error['product_name'] = "Product name must have alphabets only";
  }
  else
  {
    success['product_name'] = req.body.firstname;
//    res.render('product', {title: express, success, error});
  } 

  var alpha1 = /^[0-9]+$/;
  if(req.body.price=="")
  {
    error['product_price'] = "Product price cannot be empty";
  }
  else if(!req.body.price.match(alpha1))
  {
    error['product_price'] = "Product price must have digits only";
  }
  else
  {
    success['product_price'] = req.body.price;
  //  res.render('product', {title: express, success, error});
  }

  if(req.body.category == 0)
  {
    error['product_category'] = "Please select product category";
  }
  else
  {
    success['product_category'] = req.body.category;
    
  }

  if(error.length > 0)
  {
    res.render('product', {title: express, success, error});
  } 
  else
  {
   var file = req.files.img,
     filename = file.name;
      
       file.mv("public/myfolder/"+filename,function(err){
         if(err){
           console.log(err)
         }
      
          console.log("Done");
          var sql = "insert into product values(null, '"+ req.body.firstname +"','"+ req.body.price +"','"+filename+"','"+ req.body.category +"')";
          con.query(sql,function(err, rows, fields)
          {
            console.log(fields);
            res.redirect('/res');
          });
      });
  }
});

router.get('/del/:id',function(req,res)
{
    console.log("hello");
  con.query("DELETE FROM product WHERE id = ?",[req.params.id],function(err, rows, fields){
    res.redirect('/res');
  });
});

router.post('/delete',function(req,res)
{
   var ch= req.body.check;
   console.log(ch);
   
   var query = 'DELETE from product where product.id in (?)';

   con.query(query,[ch],function(err,req,rest){
    if (err) throw (err)
    res.redirect('/res'); 
  });
});

router.get('/edit_product/:id',function(req,res)
{
  con.query("SELECT * FROM product WHERE id = ?",[req.params.id],function(err, result, fields){
    var error = {};
    var success = {};
   res.render('edit_product', { title: 'Express', result: result, success, error});
  });
});

router.post('/update/:id',function(req,res)
{
  con.query("SELECT * FROM product WHERE id = ?",[req.params.id],function(err, result, fields){
    var error = {};
    var success = {}; 

  var alpha = /^[a-zA-Z]+$/;
  var error = {};
  var success = {};
  if(req.body.firstname=="")
  {
    error['product_name'] = "Product name cannot be empty";
    console.log(error['product_name']);
  }
  else
  {
    success['product_name'] = '';
  }
  res.render('edit_product', {title: 'Express', success, error,result: result});

});
  // console.log(req);
  // var alpha = /^[a-zA-Z]+$/;
  // if(req.body.firstname=="")
  // {
  //   con.query("SELECT * FROM product WHERE id = ?",[req.params.id],function(err, result, fields){
  //   res.render('edit_product', { title: 'Express', error1: 'Category name cannot be empty' });
  //   });
  // }
  // else if(!req.body.firstname.match(alpha))
  // {
  //   con.query("SELECT * FROM category WHERE id = ?",[req.params.id],function(err, result, fields){
  //     res.render('edit', { title: 'Express', result: result, error1: 'Category name must have alphabets only' });
  //     });
  // }
  // else
  // {
  //   console.log(req.params.id);
  //   con.query(`UPDATE category SET name = '${req.body.firstname}' where id = ?`,[req.params.id],function(err, result, fields){
  //   res.redirect('/cat');
  //   });
  // }

  // var filename = '';
  // var file = '';

  // if(req.files != null){
  //   file = req.files.img;
  //   filename = file.name;
  // }

  // if(filename != '')
  // {
  //   fs.unlink('public/myfolder/'+req.body.old_img, function (err) {
  //     console.log('File deleted!');
  //   });

  //   file.mv("public/myfolder/"+filename,function(err){
  //     if(err){
  //       console.log(err)
  //     }
  //   });

  //   con.query(`UPDATE product SET name = '${req.body.firstname}', images= '${filename}', price= '${req.body.price}', category= '${req.body.category}' where id = ?`,[req.params.id],function(err, result, fields){
  //   res.redirect('/res');
  //   });
  // }
  // else
  // {
  //   con.query(`UPDATE product SET name = '${req.body.firstname}', price= '${req.body.price}', category= '${req.body.category}' where id = ?`,[req.params.id],function(err, result, fields){
  //   res.redirect('/res');
  //   });
  // }
});

module.exports = router;