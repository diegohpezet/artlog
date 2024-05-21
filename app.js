require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.set('views', express.static(__dirname + '/views'));
app.set('view engine', 'ejs');
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));

// Set up routes
app.use('/auth', require('./routes/auth'));
app.use('/users', require('./routes/users'));
app.use('/pictures', require('./routes/pictures'));
app.get('/', (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`MyApp listening on port ${port}`)
});