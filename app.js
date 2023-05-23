var fs = require("fs"),
  http = require("http"),
  https = require("https"),
  express = require("express"),
  router = require("./routes/index");

const bp = require('body-parser');

//App
var app = express();
app.use(express.static("public"));

if (!process.env.GOOMDEV) {
  //Enforce HTTPS
  app.use(function (req, res, next) {
    if (req.secure) {
      next();
    } else {
      res.redirect("https://" + req.headers.host + req.url);
    }
  });
}

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//Routing
app.use("/", router);

if (process.env.GOOMDEV) {
  app.listen(3000, "127.0.0.1", () => {
    console.log(`AustenSummers Website Up And Running...`);
  });
} else {
  //SSL Setup
  const httpServer = http.createServer(app);
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(
        "./certificates/www.austensummers.com.key"
      ),
      cert: fs.readFileSync(
        "./certificates/www.austensummers.com.crt"
      ),
    },
    app
  );

  //Launch!
  httpServer.listen(80, () => {
    console.log("HTTP Server running on port 80!");
  });

  httpsServer.listen(443, () => {
    console.log("HTTPS Server running on port 443!");
  });
}
