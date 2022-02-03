const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars')
const moment = require('moment');
const logger = require('./middleware/Logger')
const heros = require('./Heros')

const app = express();



//init middleware
//app.use(logger)

/*app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})*/

//Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars')

//Body parser middleware for sending post requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//Homepage route with handlebars
app.get('/', (req, res) =>res.render('index', {
    title: 'Heros App',
    heros
}))

//set static folder
app.use(express.static(path.join(__dirname, 'public')))

//heros api routes
app.use('/api/heros', require('./routes/api/heros'));

//When you deploy to a host, you want to use the port it gives you.
//Will run the server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));