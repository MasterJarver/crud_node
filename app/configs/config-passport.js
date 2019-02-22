/* SETUP_PASSPORT */
const passport = require('passport'); // модуль для работы с аутентификацией и авторизацией
const LocalStrategy = require('passport-local').Strategy; // выбор стратегии аутентификации и авторизации
const userDB = { // фейковый пользователь
    id: 1,
    login: 'masterjarver@ukr.net', // логин
    password: '123' // пароль в явном виде(вообще пароль всегда нужно шифровать)
};
// serialize
passport.serializeUser((user, done) => {
    console.log('Serialize: ', user);
    done(null, user.id); // сохранение в сессию пользовательского id
});
// deserialize
passport.deserializeUser((id, done) => {
    console.log('Deserialize: ', id); // 1
    const user = (userDB.id === id) ? userDB : false;
    done(null, user); //
});
// local strategy
passport.use(
    new LocalStrategy({usernameField: 'login'}, (login, password, done) => { // переопределение поля usernameField по умолчанию, данные от пользователя
        if(login === userDB.login && password === userDB.password) { // проверка во время аутентификации
            return done(null, userDB); // проход аутентификации
        }
        else {
            return done(null, false); // отказ в аутентификации
        }
    })
);
let str1 = 'asd';
module.exports = {
    passport: passport,
    LocalStrategy: LocalStrategy,
    userDB: userDB,
    str1: str1
};