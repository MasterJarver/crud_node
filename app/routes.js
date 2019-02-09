// create a new express router
const express = require('express'); // модуль express
const router = express.Router(); // экземпляр роутера express
const mainController = require('./controllers/main.controller'); // подключение главного контроллера
// export router
module.exports = router; // экспорт экземпляра роутера
// define routes
router.get('/', mainController.showHome);