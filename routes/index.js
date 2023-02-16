const express = require("express");
const path = require("path");
const router = express.Router();
const colombiablocker = require("./colombiablocker");
const fs = require("fs");
const stripeSecretKey = fs
  .readFileSync(path.join(__dirname + "/key.txt"), "utf8")
  .split("\n")[0];
const stripe = require("stripe")(stripeSecretKey);

const saleDB = {
  bootcamp: {
    title: "Bootcamp Deposit",
    image: "https://austensummers.com/assets/media/bootcamp8.png",
    price: 51500,
  },
  mentorship: {
    title: "Austen Summers Mentorship Deposit",
    image: "https://austensummers.com/assets/media/academy2.jpg",
    price: 51500,
  },
  immersion: {
    title: "Immersion Deposit",
    image: "https://austensummers.com/assets/media/immersion_pane.jpeg",
    price: 103000,
  },
  custom: {
    title: "Custom Amount",
    image: "https://austensummers.com/assets/media/immersion_pane.jpeg",
    price: 0,
  },
};

/*
router.get(
  "/.well-known/acme-challenge/MXEa5Keqac5BWp0x_-gHDxS9wO2UoZfgs0QUzc8iwss",
  function (req, res, next) {
    res.send(
      "MXEa5Keqac5BWp0x_-gHDxS9wO2UoZfgs0QUzc8iwss.3Luu3iycHojEMnXuYlPpDZlywOShzGIvtre3S1yQHfo"
    );
  }
);

router.get(
  "/.well-known/acme-challenge/A5aZv9AxJZl0leRQoAkMvMRUg7viZfbKYPtov8Zo4HY",
  function (req, res, next) {
    res.send(
      "A5aZv9AxJZl0leRQoAkMvMRUg7viZfbKYPtov8Zo4HY.3Luu3iycHojEMnXuYlPpDZlywOShzGIvtre3S1yQHfo"
    );
  }
); */


/* GET home page. */
router.get("/", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

/* GET mentorship page. */
router.get("/academy", function (req, res, next) {
  res.redirect("/mentorship");
});

router.get("/mentorship", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/mentorship.html"));
});

/* GET bootcamp page. */
router.get("/bootcamp", function (req, res) {
  res.redirect("/immersion");
});

/* GET immersion page. Colombia Blocker Middleware */
router.get("/immersion", colombiablocker, function (req, res, next) {
  res.sendFile(path.join(__dirname + "/immersion.html"));
});

/* GET clientresults page. */
router.get("/results", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/clientresults.html"));
});

/* GET GTA page. */
router.get("/transformation", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/transformation.html"));
});

router.get("/terms", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/terms.html"));
});

router.get("/collab", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/collab.html"));
});

router.get("/disclaimer", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/disclaimer.html"));
});

// NOTE: careers points to jobs.html not careers.html
router.get("/careers", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/jobs.html"));
});

router.get("/contact", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/contact.html"));
});

router.get("/pay", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/payments.html"));
});

router.get("/success", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/success.html"));
});

router.get("/fail", function (req, res, next) {
  res.sendFile(path.join(__dirname + "/fail.html"));
});

router.get("/teachable_redirect", function (req, res, next) {
  res.redirect(301, 'https://austen-summers-academy.teachable.com/');
});

router.post("/bill/custom", async (req, res) => {
  if(isNaN(req.body.price) || Number(req.body.price) < 1 || Number(req.body.price) > 999999) {
    //hack-proofing the custom price input
    res.json({id:0}); //Triggering error so the process.js will reload the page
  }

  let session_error = false;  //let's detect if session creation fails or not
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: saleDB["custom"].title,
            images: [saleDB["custom"].image],
          },
          unit_amount: Number(req.body.price) * 100,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://www.austensummers.com/success`,
    cancel_url: `https://www.austensummers.com/fail`,
  }).catch((error) => {
    session_error = true;  //if error occurs, set the flag
  })
  if(session_error) {  
    res.json({id : 0});  //if there is an error, trigger a reload by sending zero id
  } else {
  res.json({ id: session.id }); //otherwise, send the session id
  }
});

router.post("/bill/bootcamp", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: saleDB["bootcamp"].title,
            images: [saleDB["bootcamp"].image],
          },
          unit_amount: saleDB["bootcamp"].price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://www.austensummers.com/success`,
    cancel_url: `https://www.austensummers.com/fail`,
  });
  res.json({ id: session.id });
});

router.post("/bill/mentorship", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: saleDB["mentorship"].title,
            images: [saleDB["mentorship"].image],
          },
          unit_amount: saleDB["mentorship"].price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://www.austensummers.com/success`,
    cancel_url: `https://www.austensummers.com/fail`,
  });
  res.json({ id: session.id });
});

router.post("/bill/immersion", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: saleDB["immersion"].title,
            images: [saleDB["immersion"].image],
          },
          unit_amount: saleDB["immersion"].price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `https://www.austensummers.com/success`,
    cancel_url: `https://www.austensummers.com/fail`,
  });
  res.json({ id: session.id });
});

router.get("*", function (req, res) {
  res.redirect("/");
});

module.exports = router;
