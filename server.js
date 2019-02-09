// grab our dependencies
const express = require('express'); // модуль express
const app = express(); // инициализация express приложения
const port = process.env.PORT || 3000; // берем порт из окружения или 3000 по дефолту
// configure our application

// set the routes
app.get('/', (req, res) => {
    res.send('Hello, I am the app!');
});
// start our server
app.listen(port, () => { // старт прослушки
    console.log(`Server listening on http://localhost:${port}`);
});