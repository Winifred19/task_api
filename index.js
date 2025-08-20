const express = require(express);
const app = express();

const taskRoute

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("server is up")
});

app.listen(3000,()=>{
    console.log("server running on port 3000")
});