const express = require('express');
const hbs = require('hbs');
const fs = require('fs'); //filestream?

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

//logger
app.use((req, res, next) => {
  //app will only continue to run once we call "next()"
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log)
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server log.')
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance.hbs');
});

//takes the absolute path to the folder we want to present
//__dirname stores the path to the project directory
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express...yo</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home',
    welcomeMessage: 'Hullo'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res)=> {
  res.send({
    status: 404,
    errorMessage: 'Bad request yo'
  })
});

app.listen(3000, () => {
  console.log('Express Server is up on port 3000');
});
