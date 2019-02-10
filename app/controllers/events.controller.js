const Event = require('../models/event'); // подключение класса модели ивента
module.exports = { // экспрт функии получения даннх ивентов
    showEvents : showEvents,
    showSingle : showSingle,
    seedEvents : seedEvents
};
    // show all events
    function showEvents(req,res) { // функция показа
        // get all events
        //return a view with data
        res.render('pages/events', {events: events}); // отображение по маршруту массива events
    }
    // show a single event
    function showSingle(req, res) {
        // get a single event
        const event = {name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.'};
        res.render('pages/single', {event: event});
    }
    // seed our database
    function seedEvents(req, res) {
        // create some events
        const events = [
            {name: 'Basketball', description: 'Throwing into a basket.'},
            {name: 'Swimming', description: 'Travelling distance by water.'},
            {name: 'Weightlifting', description: 'Lifting heavy things up.'},
            {name: 'Ping Pong', description: 'Super fast paddles'}
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