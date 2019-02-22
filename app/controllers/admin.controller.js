const passport = require('passport');
let showAdminPage = (req, res) => {
    res.send('Admin page');
};
let login = (req, res, next) => {
    passport.authenticate('local', null,(err, user) => { // не заходит
        console.log('user: ' + user);
        console.log('user: ');
        if(err) { // если возникла любая ошибка
            req.flash('errors', errors.map(err => err.msg));
            return next(err);
        }
        if(!user) { // если пользователь не найден
            req.flash('error', 'Error login or password'); // вывод сообщения об ошибке
            //return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if(err) {
                return next(err);
            }
            return res.redirect('/admin');
        })(req, res, next);
    });
};
let auth = (req, res, next) => { // функция принятия решения пробрасывать ли на /admin
    if(req.isAuthenticated()) { // если запрос прошел аутентификацию, то есть если пользователь был сохранен в сессию
        next(); // пробрасываем дальше на выполнение контроллера после middleware
    }
    else {
        return res.redirect('/');
    }
};
module.exports = {
    showAdminPage: showAdminPage,
    login: login,
    auth: auth
};