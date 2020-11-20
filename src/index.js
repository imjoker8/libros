const cors = require('cors');
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config')
// require('dorenv/config');

// const index = require('./routes/index');
const books = require('./routes/books');

//settings
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//rutas
app.use('/api',books);

//static files
// app.use(express.static(path.join(__dirname, 'dist/appClient')));

//connection to DBB
mongoose.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true,
    useUnifiedTopology: true },
    () => console.log('Connected to DB')
);

// listening to the server
app.listen(app.get('port'), () => {
    console.log('Corriendo en el puerto', app.get('port'));
});