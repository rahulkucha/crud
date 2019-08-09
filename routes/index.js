var express = require('express');
var router = express.Router();
var mysql = require('mysql');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});

con.connect(function(err){
  if (err) throw err;
  console.log("Connecteds");
});
/* GET home page. */

router.get('/', function(req, res) {
  con.query("SELECT * FROM product", function (err, result, fields) {
    res.render('home', {title: express, result: result});
  });
});

router.get('/cat', function(req, res) {
  con.query("SELECT * FROM category", function (err, result, fields) {
    res.render('index', { title: 'Express', result: result });
  });
});

router.post('/cats',function(req,res)
{
  var alpha = /^[a-zA-Z]+$/;
  console.log(req.body);
  if(req.body.firstname == ""){
    con.query("SELECT * FROM category", function (err, result, fields) {
      console.log(result);
      res.render('index', {result: result , title: 'message', errorz: 'Category name cannot be empty' });
    });
  }
  else if(!req.body.firstname.match(alpha))
  {
    con.query("SELECT * FROM category", function(err, result, fields){
      res.render('index', { title: 'Express', result: result, errorz: 'Category name must have alphabets only' });
      });
  }
  else
  {
    var sql = "insert into category values(null, '"+ req.body.firstname +"')";
    con.query(sql, function(err, rows, fields)
    {
      res.redirect('/cat');
    });
  }
});

router.get('/delete/:id',function(req,res)
{
  //console.log(req.params.id);
  con.query("DELETE FROM category WHERE id = ?",[req.params.id],function(err, rows, fields){
    //console.log(rows);
    res.redirect('/cat');
  });
});

router.post('/del',function(req,res)
{
   var ch= req.body.check;
   console.log(ch);
  
   var query = 'DELETE from category where category.id in (?)';

   con.query(query,[ch],function(err,req,rest){
    if (err) throw (err)
    res.redirect('/cat'); 
  });
});

router.get('/edit/:id',function(req,res)
{
  //console.log(req.params.id);
  con.query("SELECT * FROM category WHERE id = ?",[req.params.id],function(err, result, fields){
   res.render('edit', { title: 'Express', result: result });
   //console.log(result);
  });
});

router.post('/edit/:id',function(req,res)
{
  var alpha = /^[a-zA-Z]+$/;
  if(req.body.firstname=="")
  {
    con.query("SELECT * FROM category WHERE id = ?",[req.params.id],function(err, result, fields){
    res.render('edit', { title: 'Express', result: result, error1: 'Category name cannot be empty' });
    });
  }
  else if(!req.body.firstname.match(alpha))
  {
    con.query("SELECT * FROM category WHERE id = ?",[req.params.id],function(err, result, fields){
      res.render('edit', { title: 'Express', result: result, error1: 'Category name must have alphabets only' });
      });
  }
  else
  {
    console.log(req.params.id);
    con.query(`UPDATE category SET name = '${req.body.firstname}' where id = ?`,[req.params.id],function(err, result, fields){
    res.redirect('/cat');
    });
  }
});

module.exports = router;