// main controller file, в контроллере описан функционал, котрый вызывается из роутера
module.exports = { // экспорт объекта с полями
    // show the home page
    showHome: (req, res) => { // метод showHome
        res.render('pages/home'); // отрисовка шаблона, ищет в views/pages/home.ejs
    }
};