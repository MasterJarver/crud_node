// create a new express router
const express = require('express'); // модуль express
const router = express.Router(); // экземпляр роутера express
const mainController = require('./controllers/main.controller'); // подключение главного контроллера
const eventsController = require('./controllers/events.controller');
const adminController = require('./controllers/admin.controller');
require('./configs/config-passport'); // для всех роутов подключаем конфиг
// export router
module.exports = router; // экспорт экземпляра роутера
// define routes
// main routes
router.get('/', mainController.showHome); // отображение главной страницы
router.post('/', mainController.showHomeLogin); // использоание встроенной аутентификации
// admin routes
router.get('/admin', adminController.auth, adminController.showAdminPage); // отображение админской страницы
router.post('/login', adminController.login); // маршрут логина
// event routes
router.get('/events/', eventsController.showEvents); // отображение ивентов
// seed events
router.get('/events/seed', eventsController.seedEvents); // запись в бд новых ивентов
// create events
router.get('/events/create', eventsController.showCreate); // показ view для ввода
router.post('/events/create', eventsController.processCreate); // отправка данных
// edit events
router.get('/events/:slug/edit', eventsController.showEdit); // показ view для редактирования
router.post('/events/:slug', eventsController.processEdit); //
// delete events
router.get('/events/:slug/delete', eventsController.deleteEvent); // удаление events get зпросом
// show a single event
router.get('/events/:slug', eventsController.showSingle); // отображение одного ивента