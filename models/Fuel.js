var alasql = require("alasql");

alasql(
  "CREATE TABLE fuel_management (driver_id number, date DATE, fuelType string, price_per_litre number, volume number)"
);

const sample = require("./sampledata.json");
alasql("CREATE TABLE fuel");
alasql("SELECT * INTO fuel FROM ?", [sample]);

var Fuel = {
  getAllFuels: function(month, callback) {
    month = parseInt(month);
    const date = new Date();
    const year = date.getUTCFullYear();
    console.log(year);
    return alasql(
      "Select SUM(price_per_litre * volume) from fuel WHERE MONTH(date) = ? "[
        month
      ],
      callback
    );
  },

  //get monthly costs
  getFuelById: function(month, callback) {
    month = parseInt(month);

    return alasql(
      "Select SUM(price_per_litre * volume) as total from fuel WHERE MONTH(date) =?",
      [month],
      callback
    );
  },

  //get monthly costs by driver
  getTotalCostsPerMonth: function(month, driver, callback) {
    driver = parseInt(driver);
    month = parseInt(month);
    return alasql(
      "Select SUM(price_per_litre * volume) from fuel WHERE MONTH(date) =? AND driver_id = ?",
      [month, driver],
      callback
    );
  },

  // get monthly details
  getMonthlyDetails: function(month, callback) {
    month = parseInt(month);

    const res = alasql(
      "Select *, (price_per_litre * volume) AS total_price from fuel WHERE MONTH(date) =?",
      [month],
      callback
    );
    return res;
  },

  // get monthly details for driver
  getMonthlyDetailsForDriver: function(month, driver, callback) {
    month = parseInt(month);

    driver = parseInt(driver);

    const res = alasql(
      "Select *, (price_per_litre * volume) AS total_price from fuel WHERE MONTH(date) =?  AND driver_id = ?",
      [month, driver],
      callback
    );
    return res;
  },

  // get monthly details grouped by fuel
  getMonthlyDetailsByFuel: function(month, callback) {
    month = parseInt(month);

    var res = alasql(
      "SELECT INDEX fuelType, {volume:volume, price_per_litre:price_per_litre, total_price: (price_per_litre * volume)} FROM (SELECT fuelType, SUM(volume) AS volume, AVG(price_per_litre) AS price_per_litre FROM fuel WHERE MONTH(date) =? GROUP BY fuelType)",
      [month],
      callback
    );
    return res;
  },

  // get monthly details for driver grouped by fuel
  getMonthlyDetailsForDriverByFuel: function(month, driver, callback) {
    month = parseInt(month);

    driver = parseInt(driver);

    var res = alasql(
      "SELECT INDEX fuelType, {volume:volume, price_per_litre:price_per_litre, total_price: (price_per_litre * volume)} FROM (SELECT fuelType, SUM(volume) AS volume, AVG(price_per_litre) AS price_per_litre FROM fuel WHERE MONTH(date) =? AND driver_id= ? GROUP BY fuelType)",
      [month, driver],
      callback
    );
    return res;
  },
  // Manually add single entries.
  addFuel: function(Fuel, callback) {
    return alasql(
      "Insert into fuel_management values(?,?,?,?,?)",
      [
        Fuel.driver_id,
        Fuel.Date,
        Fuel.fuelType,
        fuel.price_per_litre,
        fuel.volume
      ],
      callback
    );
  },
  deleteFuel: function(id, callback) {
    return alasql("delete from Fuel where driver_id=?", [id], callback);
  },
  updateFuel: function(id, Fuel, callback) {
    return alasql(
      "update Fuel set Title=?,Status=? where Id=?",
      [Fuel.Title, Fuel.Status, id],
      callback
    );
  }
};
module.exports = Fuel;
