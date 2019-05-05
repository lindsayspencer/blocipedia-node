require("dotenv").config();
const logger = require('morgan');

module.exports = {
    init(app){
        const staticRoutes = require('../routes/static');
        const userRoutes = require('../routes/users');
        const wikiRoutes = require('../routes/wikis');
        const collaboratorRoutes = require('../routes/collaborators');

        app.use(staticRoutes);
        app.use(userRoutes);
        app.use(wikiRoutes);
        app.use(collaboratorRoutes);
        app.use(logger('dev'));
    }
}