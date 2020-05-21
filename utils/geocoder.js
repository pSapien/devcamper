const NodeGeocoder = require("node-geocoder");

module.exports = NodeGeocoder({
  provider: process.env.GEOCODER_PROVIDER,
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
  httpAdapter: "https",
});
