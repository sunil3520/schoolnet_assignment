const express = require("express");
const cors = require("cors");
const { connection } = require("mongoose");
const { userRoutes } = require("./routes/user.routes");
const { scoreRoutes } = require("./routes/score.routes");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.status(200).send({msg:"Welcom to Home page"})
})

app.use(userRoutes)
app.use(scoreRoutes)


app.listen(8080,async()=>{
    try {
        await connection;
        console.log("Mongo db connected");
    } catch (error) {
        console.log("Mongo not connected")
        console.log("error",error)
    }

    console.log("Server is running on port 8080")
})