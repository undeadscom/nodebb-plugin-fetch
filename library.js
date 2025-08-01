"use strict";

const Plugin = {};

Plugin.addExternalData = async function (data) {
  console.log("fetched rates", Date.now());
  try {
    const response = await fetch(
      "https://api-gateway.zombiesdev.com/rates/UDS/USD"
    );
    const json = await response.json();

    data.templateValues = data.templateValues || {};
    data.templateValues.rates = json.data;

    data.templateValues.rates.isPositivePercentageChange24h =
      json.data.percentageChange24h >= 0;

    data.templateValues.rates.percentageChange24h =
      json.data.percentageChange24h.toFixed(2);
  } catch (err) {
    console.error("[server-fetch] rates fetch error:", err);
    data.templateValues.externalResult = {error: true};
  }

  return data;
};

module.exports = Plugin;
