// load environment variables
require('dotenv').config(); // загрузка переменных окружения
// grab our dependencies
const express = require('express'); // модуль express
const app = express(); // инициализация express приложения
const port = process.env.PORT || 3000; // берем порт из окружения или 3000 по дефолту
const expressLayouts = require('express-ejs-layouts'); // модуль для работы с шаблонами
const mongoose = require('mongoose'); // модуль для работы с бд
const bodyParser = require('body-parser'); // мудль для работы с телом POST запроса
const session = require('express-session'); // для работы с сесиями
const cookieParser = require('cookie-parser'); //парсер куки
const flash = require('connect-flash'); // мудль для использования флеш сообшений
const expressValidator = require('express-validator'); // моудль для валидации
// configure our application
// set sessions and cookie parser
app.use(cookieParser()); // использование cookieParser
app.use(session({ // использование сессий
    secret: process.env.SECRET,
    cookie: {maxAge: 60000},
    resave: false, // forces the session to be saved back
    saveUninitialized: false // don't save unmodified
}));
app.use(flash());// использование flash сообщений
// tell the express where to look for static assets
app.use(express.static(__dirname + '/public')); // указать express где брать статические файлы
// set ejs as our templating engine
app.set('view engine', 'ejs'); // указывает express шаблон вью для использования
app.use(expressLayouts); // использование шаблона в приложеии
// connect to ur database
mongoose.connect(process.env.DB_URI); // коннект к бд используя пепеменную окружения
// use body parser to grab info from a form
app.use(bodyParser.urlencoded({extended: true})); // использование пакета в приложении
app.use(expressValidator()); // использование валидатора
// set the routes
app.use(require('./app/routes')); // use custom route
// start our server
app.listen(port, () => { // старт прослушки
    console.log(`Server listening on http://localhost:${port}`);
});