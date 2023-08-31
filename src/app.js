const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const noteRouter = require('./routes/note.routes');
const authRouter = require('./routes/auth.routes');

class App {
    constructor() {
        if (App.instance) {
            return App.instance;
        }
        this.app = express();
        this.app.use(express.json({ limit: "20mb" }));
        this.app.use(express.urlencoded({ limit: "20mb", extended: true }));
        this.app.use(cors());
        this.registerRoutes();
        App.instance = this;
    }

    registerRoutes() {
        this.app.use("/api/user", userRouter);
        this.app.use("/api/note", noteRouter);
        this.app.use("/api/auth", authRouter);
    }
}
module.exports = App;