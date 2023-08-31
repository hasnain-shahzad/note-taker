class Logger {
    log = (message) => {
        console.log(`${new Date().toUTCString()}    [INFO] ${message}`);
    }
    error = (message) => {
        console.log(`${new Date().toUTCString()}    [ERROR] ${message}`);
    }

    logApi = (req, res, next) => {
        console.log(`${new Date().toUTCString()}    [INFO] ${req.method} ${req.baseUrl}${req.url} api called`);
        next();
    };

    static getInstance() {
        if (!this.instance) {
            this.instance = new Logger();
        }
        return this.instance;
    }
};

module.exports = Logger;