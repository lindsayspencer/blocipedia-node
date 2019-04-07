require("dotenv").config();
const logger = require('morgan');

module.exports = {
    init(app){
        const staticRoutes = require('../routes/static');
        const userRoutes = require('../routes/users');

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(logger('dev'));
    }
}