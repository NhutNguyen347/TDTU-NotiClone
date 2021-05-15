const express = require('express')
const path=require('path')
const morgan=require('morgan')
const app = express()
app.use(morgan('combined'))
// app.set('views', path.join(__dirname, 'views'));

const port = 3000

app.set('view engine', 'ejs');
//Home Page
app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/login',  (req, res,next)=> {
  var mess=req.flash('error')
  res.render('login',{
    mess:mess,
    hasErrors:mess.length >0,
  }); // load the login page
});
app.get('/admin',(req,res)=>{
  res.render('admin');
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})