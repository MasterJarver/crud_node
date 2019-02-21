// main controller file, в контроллере описан функционал, котрый вызывается из роутера
const config = require('../configs/config-passport');
const passport = require('passport');
let showHome = (req, res) => { // метод showHome
    res.render('pages/home'); // отрисовка шаблона, ищет в views/pages/home.ejs
};
let showHomeLogin = (req, res, next) => {
    console.log(config.str1);
    console.log('showHomeLogin'); // заходит
    passport.authenticate('local', null, (err, user) => { // не заходит
        console.log('user: ' + user);
        console.log('user: ');
        if(err) { // если возникла любая ошибка
            req.flash('errors', errors.map(err => err.msg));
            return next(err);
        }
        if(!user) { // если пользователь не найден
            req.flash('error', 'Error login or password'); // вывод сообщения об ошибке
        }
        req.logIn(user, (err) => {
            if(err) {
                return next(err);
            }
            return res.redirect('/admin');
        })(req, res, next);
    });
    const auth = (req, res, next) => {
        if(req.isAuthenticated()) { // если пользователь был сохранен в сессии
            next();
        }
        else {
            return res.redirect('/');
        }
    };
    module.exports= {
        auth: auth
    };
    req.checkBody('login', 'Login is required.').notEmpty(); // валидация логина
    req.checkBody('password', 'Password is required.').notEmpty();
    const errors = req.validationErrors(); // запись ошибок из ответа
    let credentials = { // массив данных логина и пароля из POST запроса
        login: req.body.login,
        password: req.body.password,
    };
    console.log(credentials);
    res.end();
};
module.exports = { // экспорт объекта с полями
    // show the home page
    showHome: showHome,
    showHomeLogin: showHomeLogin
};