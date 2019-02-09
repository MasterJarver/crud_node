// main controller file, в контроллере описан функционал, котрый вызывается из роутера
module.exports = { // экспорт объекта с полями
    // show the home page
    showHome: (req, res) => { // метод showHome
        res.send('Hello, I am the app!');
    }
};