/* SETUP_PASSPORT */
const passport = require('passport'); // модуль для работы с аутентификацией и авторизацией
const LocalStrategy = require('passport-local').Strategy; // выбор стратегии аутентификации и авторизации
const userDB = { // фейковый пользователь
    id: 1,
    email: 'masterjarver@ukr.net', // логин
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
    done(null, user); // сохранение в сессию пользовательского id
});
// local strategy
passport.use(
    new localStrategy({usernameField: 'email'}, (email, password, done) => {
        if(email === userDB.email && password === userDB.password) { // проверка во время аутентификации
            return done(null, userDB);
        }
        else {
            return done(null, false);
        }
    })
);