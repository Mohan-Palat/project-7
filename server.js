const express = require("express");
const app = express();
PORT = 3000;

app.get('/', (req,res) =>{
res.send(`Let's do this!`);
})





app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`);
});