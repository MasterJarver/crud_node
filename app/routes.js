// create a new express router
const express = require('express'); // модуль express
const router = express.Router(); // экземпляр роутера express
const mainController = require('./controllers/main.controller'); // подключение главного контроллера
const eventsController = require('./controllers/events.controller');
// export router
module.exports = router; // экспорт экземпляра роутера
// define routes
// main routes
router.get('/', mainController.showHome); // отображение гравной страницы
// event routes
router.get('/events/',       eventsController.showEvents); // отображение ивентов
router.get('/events/:slug', eventsController.showSingle); // отображение одного ивента