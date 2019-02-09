// create a new express router
const express = require('express'); // модуль express
const router = express.Router(); // экземпляр роутера express
// export router
module.exports = router; // экспорт экземпляра роутера
// define routes
router.get('/', (req, res) => { // добавление маршрута в экземпляр роутера
    res.send('Hello, I am the app!');
});