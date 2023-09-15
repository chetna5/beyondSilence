const express = require("express");
const retailChat = require("./routes/retailChat");
const cors = require("cors");
const bodyParser = require("body-parser");

// start the server
async function startServer() {
    // initialize
  const app = express();
  app.use(cors());
  app.use(express.json());
  app.use(require("morgan")("dev"));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // routes
  app.use("/chat", retailChat);
  app.use("/token", (req, res) => {
    res.sendFile(__dirname + '/public/tokenForm.html');
  });

  // invalid end point, not found
  app.use((req, res) => {
    const err = new Error(`404 not found`);
    res.status(404).send(err.message);
  });

  app.listen(8080, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server running at http://localhost:${process.env.PORT}`);
  });
}

startServer();