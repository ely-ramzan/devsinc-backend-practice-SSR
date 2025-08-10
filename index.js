const express = require("express");
const dotenv = require("dotenv");
const { connectToMongoDb } = require("./src/utils/dbConnections");
dotenv.config();
const app = express();

(async () => {
    try {
        const url = process.env.MONGO_URI;
        await connectToMongoDb(url);
        console.log("Mongo db has been connected");
        
        const port = process.env.PORT;
        console.log(`Server is listening on port ${port}`);
    } catch (err) {
        console.error(`${err}: in connection`);
    }
})();
