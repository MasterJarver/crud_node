const mongoose = require('mongoose'); // модуль для работы с бд
const Schema = mongoose.Schema; // подключение класса модели
// create a schema
const eventSchema = new Schema({
    name: {
        type: String
    },
    slug: {
        type: String
    },
    description: {
        type: String
    }
});
// middleware
// make the sure that the slug is created from the name
// eventSchema.pre('save', function(next){
//     this.slug = slugify(this.name);
//     next();
// });
//create the model
const eventModel = mongoose.model('Event', eventSchema);
// export the model
module.exports = eventModel;