require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.use('/', express.static(__dirname + '/public'))
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));

// Set up routes
app.use('/', require('./routes/viewRoutes'));
app.use('/api', require('./routes/apiRoutes'))

app.listen(port, () => {
  console.log(`MyApp listening on port ${port}`)
});