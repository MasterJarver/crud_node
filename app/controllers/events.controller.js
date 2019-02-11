const Event = require('../models/event'); // подключение класса модели ивента
module.exports = { // экспрт функии получения даннх ивентов
    showEvents: showEvents,
    showSingle: showSingle,
    seedEvents: seedEvents,
    showCreate: showCreate,
    processCreate: processCreate,
    showEdit: showEdit,
    processEdit: processEdit,
    deleteEvent: deleteEvent
};
// show all events
function showEvents(req,res) { // функция показа
    // get all events
    Event.find({}, (err, events) => { // поиск всех записей в коллекции
        if(err) {
            res.status(404);
            res.send('Events not found');
        }
        //return a view with data
        res.render('pages/events', { // отображение по маршруту массива events
            events: events,
            success: req.flash('success')
        });
    });

}
// show a single event
function showSingle(req, res) {
    // get a single event
    Event.findOne({slug: req.params.slug}, (err, event) => { // ищем конкретную запись в бд
        if(err) {
            res.status(404);
            res.send('Event not found');
        }
        res.render('pages/single', {
            event: event,
            success: req.flash('success')
        });
    });
}
// seed our database
function seedEvents(req, res) {
    // create some events
    const events = [
        {name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.'},
        {name: 'Swimming', slug: 'swimming', description: 'Travelling distance by water.'},
        {name: 'Weightlifting', slug: 'weightlifting', description: 'Lifting heavy things up.'},
        {name: 'Ping Pong', slug: 'ping pong', description: 'Super fast paddles'}
    ];
    // use the Event model to insert/save
    Event.remove({}, () => { // удаление всех записей в коллекции
        for(event of events) { // итерация по массиву events
            let newEvent = new Event(event); // создание экземпляра event
            newEvent.save().catch(err => console.log(err)); // сохранение в бд ивента
        }
    });
    // seeded!
    res.send('Database seeded!');
}
// show the create form
function showCreate(req, res) {
    res.render('pages/create', {
        errors: req.flash('errors') // отображение flash сообщений об ошибках
    });
}
// process create form
function processCreate(req, res) {
    // validate information
    req.checkBody('name', 'Name is required.').notEmpty(); // валидация тела запроса на пустоту
    req.checkBody('description', 'Description is required.').notEmpty();
    // if there are errors, redirect and save errors to flash
    const errors = req.validationErrors(); // запись ошибок из ответа
    if(errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect('/events/create'); // перенаправление на форму создания ивентов
    }
    // create a new event
    const event = new Event({ // создание нового ивента
        name: req.body.name, // запись в поле из post запроса name
        slug: req.body.name.toString().toLowerCase(),
        description: req.body.description // запись в поле из post запроса description
    });
    // save event
    event.save((err) => {
        if(err)
            throw err; // выброс исключения
        // set a successful flash message
        req.flash('success', 'Successfully created event'); // сохранение успешного сообщения в сессию
        // redirect to the newly created event
        res.redirect(`/events/${event.slug}`);
    })
}
// show the edit form
function showEdit(req, res) {
    Event.findOne({slug: req.params.slug}, (err, event) => {
        res.render('pages/edit', {
            event: event,
            errors: req.flash('errors')
        });
    });
}
// process the edit form
function processEdit(req, res) {
    // validate information
    req.checkBody('name', 'Name is required.').notEmpty(); // валидация тела запроса на пустоту
    req.checkBody('description', 'Description is required.').notEmpty();
    // if there are errors, redirect and save errors to flash
    const errors = req.validationErrors(); // запись ошибок из ответа
    if(errors) {
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect(`events/${req.params.slug}/edit`); // перенаправление на форму создания ивентов
    }
    // finding a current event
    Event.findOne({slug: req.params.slug}, (err, event) => { // поиск ивента по запросу
        // updating  that event
        event.name = req.body.name; // запись нового поля
        event.description = req.body.description;
        event.slug = req.body.name.toString().toLowerCase();
        event.save((err) => {
            if(err)
                throw err;
            // success flash message
            req.flash('success', 'Successfully updated event.')
            //redirect back to the /events
            res.redirect('/events'); // преенаправление на /events
        });


    });

}
// delete en event
function deleteEvent(req, res) { // удаление ивента
    Event.remove({slug: req.params.slug}, (err) => {
        // set flash data
        // redirect back to the events page
        req.flash('success', 'Event deleted!'); // flash сообщение
        res.redirect('/events'); // преенаправление
    });
}