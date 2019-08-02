var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var path = require('path');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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

app.get('/', function(req, res) {
  //con.query("SELECT * FROM category", function (err, result, fields) {
    res.render('product');
  });
//});

// router.post('/',function(req,res)
// {
//   if(req.body.firstname == ""){
//     con.query("SELECT * FROM category", function (err, result, fields) {
//       res.render('index', {result: result , title: 'message', errorz: 'hello' });
//     });
//   }
//   else
//   {
//     var sql = "insert into category values(null, '"+ req.body.firstname +"')";
//     con.query(sql,function(err, rows, fields)
//     {
//       res.redirect('/');
//     });
//   }
// });

app.post('/',function(req,res)
{
  var sql = "insert into product values('"+ req.body.firstname +"',null,null)";
    con.query(sql,function(err, rows, fields)
    {
      res.redirect('/');
    });
});
// router.get('/:id',function(req,res)
// {
//   //console.log(req.params.id);
//   con.query("DELETE FROM category WHERE id = ?",[req.params.id],function(err, rows, fields){
//     //console.log(rows);
//     res.redirect('/');
//   });
// });

// router.get('/edit/:id',function(req,res)
// {
//   //console.log(req.params.id);
//   con.query("SELECT * FROM category WHERE id = ?",[req.params.id],function(err, result, fields){
//    res.render('edit', { title: 'Express', result: result });
//    //console.log(result);
//   });
// });

// router.post('/edit/:id',function(req,res)
// {
//   //console.log(req.body.firstname);
//   con.query(`UPDATE category SET name = '${req.body.firstname}' where id = ?`,[req.params.id],function(err, result, fields){
//   //console.log(result);
//   res.redirect('/');
//   });
// });

app.listen(3000);
//module.exports = router;