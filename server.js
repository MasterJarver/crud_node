// grab our dependencies
const express = require('express'); // модуль express
const app = express(); // инициализация express приложения
const port = process.env.PORT || 3000; // берем порт из окружения или 3000 по дефолту
const expressLayouts = require('express-ejs-layouts'); // модуль для работы с шаблонами
// configure our application
// tell the express where to look for static assets
app.use(express.static(__dirname + '/public')); // указать express где брать статические файлы
// set ejs as our templating engine
app.set('view engine', 'ejs'); // указывает express шаблон вью для использования
app.use(expressLayouts); // использование шаблона в приложеии
// set the routes
app.use(require('./app/routes')); // use custom route


// start our server
app.listen(port, () => { // старт прослушки
    console.log(`Server listening on http://localhost:${port}`);
});