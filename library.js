"use strict";

const nconf = require("nconf");
const apiData = nconf.get("api");

const Plugin = {};

Plugin.addExternalData = async function (data) {
  data.templateValues = data.templateValues || {};

  data.templateValues.popoverData = [
    {
      name: "Gate.io",
      link: "https://www.gate.io/en/trade/UDS_USDT",
      description: "UDS / USDT",
      icon: "https://cdn.undeads.com/assets/forum/currencies-bar/gate-io.png",
    },
    {
      name: "MEXC",
      link: "https://www.mexc.com/exchange/UDS_USDT",
      description: "UDS / USDT",
      icon: "https://cdn.undeads.com/assets/forum/currencies-bar/mexc.png",
    },
    {
      name: "WEEX",
      link: "https://www.weex.com/trade/UDS-USDT",
      description: "UDS / USDT",
      icon: "https://cdn.undeads.com/assets/forum/currencies-bar/weex.png",
    },
    {
      name: "COINSTORE",
      link: "https://www.coinstore.com/spot/udsusdt",
      description: "UDS / USDT",
      icon: "https://cdn.undeads.com/assets/forum/currencies-bar/coinstore.png",
    },
    {
      name: "Biconomy.com",
      link: "https://www.biconomy.com/exchange/UDS_USDT",
      description: "UDS / USDT",
      icon: "https://cdn.undeads.com/assets/forum/currencies-bar/biconomy.png",
    },
    {
      name: "BingX",
      link: "https://bingx.com/en/spot/UDSUSDT",
      description: "UDS / USDT",
      icon: "https://cdn.undeads.com/assets/forum/currencies-bar/bingx.png",
    },
    {
      name: "XT.COM",
      link: "https://www.xt.com/en/trade/uds_usdt",
      description: "UDS / USDT",
      icon: "https://cdn.undeads.com/assets/forum/currencies-bar/xt.png",
    },
    {
      name: "Uniswap v3",
      link: "https://app.uniswap.org",
      description: "UDS / USDT",
      icon: "https://cdn.undeads.com/assets/forum/currencies-bar/uniswap.png",
    },
    {
      name: "PancakeSwap v3",
      link: "https://dex.coinmarketcap.com/token/ethereum",
      description: "UDS / USDT",
      icon: "https://cdn.undeads.com/assets/forum/currencies-bar/pancakeswap.png",
    },
  ];

  console.log("fetched rates1", Date.now());
  try {
    const response = await fetch(`${apiData.url}/rates/UDS/USD`);
    const json = await response.json();
    data.templateValues = data.templateValues || {};
    data.templateValues.rates = json.data;

    data.templateValues.rates.isPositivePercentageChange24h =
      json.data.percentageChange24h >= 0;

    data.templateValues.rates.percentageChange24h =
      json.data.percentageChange24h.toFixed(2);
  } catch (err) {
    console.error("[server-fetch] rates fetch error:", err);
    data.templateValues.externalResult = { error: true };
  }

  return data;
};

module.exports = Plugin;
