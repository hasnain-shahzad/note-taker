const App = require('./app');
require('dotenv').config();
const sequelize = require('./db/db.connection');
const logger = require('./utils/logger.service').getInstance();

class Server {
    constructor(port, app) {
        this.port = port;
        this.app = app;
    }

    /**
     * Starting server point
     */
    listen = async () => {
        try {
            await sequelize.authenticate();
            logger.log('Database connection has been established successfully.');

            // Sync the models with the database
            await sequelize.sync();
            this.app.listen(this.port, () => {
                logger.log(`Server listening to port ${this.port} `);
            });
        } catch (err) {
            logger.error(`Database connection error: ${err.message}`);
        }
    }
}
let appInstance = new App().app;
let server = new Server(+process.env.APP_PORT, appInstance);

server.listen();