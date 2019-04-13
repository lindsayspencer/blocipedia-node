require("dotenv").config();
const logger = require('morgan');

module.exports = {
    init(app){
        const staticRoutes = require('../routes/static');
        const userRoutes = require('../routes/users');
        const wikiRoutes = require('../routes/wikis');

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(wikiRoutes);
        app.use(logger('dev'));
    }
}