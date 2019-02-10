module.exports = { // экспрт функии получения даннх ивентов
    // show all events
    showEvents: (req,res) => { // функция показа
        // create dummy events
        const events = [
            {name: 'Basketball', slug: 'basketball', description: 'Throwing into a basket.'},
            {name: 'Swimming', slug: 'swimming', description: 'Travelling distance by water.'},
            {name: 'Weightlifting', slug: 'weighlifting', description: 'Lifting heavy things up.'}
        ];
        //return a view with data
        res.render('pages/events', {events: events}); // отображение по маршруту массива events
    }
};