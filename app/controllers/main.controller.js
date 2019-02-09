// main controller file, в контроллере описан функционал, котрый вызывается из роутера
module.exports = {
    // show the home page
    showHome: (req, res) => {
        res.send('Hello, I am the app!');
    }
};