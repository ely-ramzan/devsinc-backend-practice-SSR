const express = require("express");
const dotenv = require("dotenv");
const { connectToMongoDb } = require("./src/utils/dbConnections");
const authRouter = require("./src/routes/authRoutes");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/api/auth",authRouter);


(async () => {
    try {
        const url = process.env.MONGO_URI;
        await connectToMongoDb(url);
        console.log("Mongo db has been connected");
        
        const port = process.env.PORT || 3000;
        app.listen(port,() => {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (err) {
        console.error(`${err}: in connection`);
    }
})();
