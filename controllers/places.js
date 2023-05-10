const router = require("express").Router();
const Places = require("../models/places");

// Get /places
router.get("/", (req, res) => {
  res.render("places/index", { places: Places });
});

router.get("/new", (req, res) => {
  res.render("places/new");
});

router.post("/", (req, res) => {
  if (!req.body.pic) {
    // Default image if one is not provided
    req.body.pic = "http://placekitten.com/400/400";
  }
  if (!req.body.city) {
    req.body.city = "Anytown";
  }
  if (!req.body.state) {
    req.body.state = "USA";
  }
  Places.push(req.body);
  res.redirect("/places");
});

router.get("/:id", (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) {
    res.render("error404");
  } else if (!places[id]) {
    res.render("error404");
  } else {
    res.render("places/show", { place: Places[id], id });
  }
});

router.delete("/places/:id", (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) {
    res.render("error404");
  } else if (!Places[id]) {
    res.render("error404");
  } else {
    Places.splice(id, 1);
    res.redirect("/places");
  }
});

router.get("/:id/edit", (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) {
    res.render("error404");
  } else if (!Places[id]) {
    res.render("error404");
  } else {
    res.render("places/edit", { place: Places[id] });
  }
});

router.put("/:id", (req, res) => {
  let id = Number(req.params.id);
  if (isNaN(id)) {
    res.render("error404");
  } else if (!places[id]) {
    res.render("error404");
  } else {
    // Dig into req.body and make sure data is valid
    if (!req.body.pic) {
      // Default image if one is not provided
      req.body.pic = "http://placekitten.com/400/400";
    }
    if (!req.body.city) {
      req.body.city = "Anytown";
    }
    if (!req.body.state) {
      req.body.state = "USA";
    }

    // Save the new data into places[id]
    Places[id] = req.body;
    res.redirect(`/places/${id}`);
  }
});

module.exports = router;
