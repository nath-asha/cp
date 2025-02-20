const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
// const bodyParser = require("body-parser");
// const Leader = require("./models/leaderModel");
const data = require('../front/frontend/public/scores.json');

const app = express();
const router = express.Router();
app.use(router);

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    // res.send("API is running");
    res.send(data);
});

// router.get("/", async (req, res) => {
//     let results = await Leader.find();
//     res.send(results).status(200);
//   });
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

connectDB();
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

const scoresSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    score: {
        type : Number,
        required : true
    },
    github_url: {
        type : String,
        required : true
    }
});

const scores = mongoose.model("scores", scoresSchema);

app.get('/', async (req, res) => {
    try {
        const data = await scores.find();
        res.json(data);
        // console.log(data);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
