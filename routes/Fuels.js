var express = require("express");
var router = express.Router();
var Fuel = require("../models/Fuel");

router.get("/:id?/details", function(req, res, next) {
  console.log("hello world sz");

  Fuel.getMonthlyDetails(req.params.id, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      console.log(res);
      res.json(rows);
    }
  });
});

router.get("/:id?/details/fueltype", function(req, res, next) {
  console.log("hello world sz");

  Fuel.getMonthlyDetailsByFuel(req.params.id, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      console.log(res);
      res.json(rows);
    }
  });
});

router.get("/:id?/:driver?/details", function(req, res, next) {
  Fuel.getMonthlyDetailsForDriver(req.params.id, req.params.driver, function(
    err,
    rows
  ) {
    if (err) {
      res.json(err);
    } else {
      console.log(res);
      res.json(rows);
    }
  });
});

router.get("/:id?/:driver?/details/fueltype", function(req, res, next) {
  4;

  Fuel.getMonthlyDetailsForDriverByFuel(
    req.params.id,
    req.params.driver,
    function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        console.log(res);
        res.json(rows);
      }
    }
  );
});

router.get("/:id?", function(req, res, next) {
  if (req.params.id) {
    Fuel.getFuelById(req.params.id, function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Fuel.getAllFuels(function(err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

router.get("/:id?/:driver?", function(req, res, next) {
  Fuel.getTotalCostsPerMonth(req.params.id, req.params.driver, function(
    err,
    rows
  ) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post("/", function(req, res, next) {
  Fuel.addFuel(req.body, function(err, count) {
    //console.log(req.body);
    if (err) {
      res.json(err);
    } else {
      res.json(req.body); //or return count for 1 & 0
    }
  });
});
router.post("/:id", function(req, res, next) {
  Fuel.deleteAll(req.body, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.delete("/:id", function(req, res, next) {
  Fuel.deleteFuel(req.params.id, function(err, count) {
    if (err) {
      res.json(err);
    } else {
      res.json(count);
    }
  });
});
router.put("/:id", function(req, res, next) {
  Fuel.updateFuel(req.params.id, req.body, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
