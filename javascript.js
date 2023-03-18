// Konstanten und Initialisierung
const API_KEY = "T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
const CONTRACT_ADDRESS = "0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f";
const BASE_API_URL = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=" + CONTRACT_ADDRESS + "&tag=latest&apikey=" + API_KEY;

const addresses = {
  p2e: "0x2ac5c6400bb5714cfaec5e45f58e31a34dda8f3e",
  treasury: "0xceeae72d35f5e6fb3e479f0e21eb0f1974146cd4",
  dev: "0xf2e4efbcec08d128205d299d6358e7d095eab2f4",
  deployer: "0xd5a7661d150b41de85a18f756e0fda78c4bb7d0a",
  tsVesting: "0xa43a1fa8435483c49c79b37d729c47821eac6cda",
  priv: "0x531bcca5bd3323bb5338b6db1dde7532b7299ac1",
  tsInc1: "0x4efaab74cc550f0e380df685a23d0f9edea1d162",
  tsInc2: "0xf3763abe055577beb7addb7e3554c0353be0cbe9",
  locked: "0x586c21a779c24efd2a8af33c9f7df2a2ea9af55c",
  tsDifferentWallet: "0xddcbec8a64d216dfcff58d7b2b76fbdd9d9140bc",
  burn: "0x000000000000000000000000000000000000dead"
};

const cgAPI = "https://api.coingecko.com/api/v3/simple/price?ids=nft-champions&vs_currencies=USD";

// Hilfsfunktionen
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function percentage(burnedTokens, circSupply) {
  const totalSupply = 1000000000;
  const ts = totalSupply - burnedTokens;
  const percentageCirc = circSupply / ts;
  return Number(percentageCirc).toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2
  });
}

function getClientTime() {
  return new Date().toLocaleString();
}

function buildApiUrl(address) {
  return `${BASE_API_URL}&address=${address}`;
}

async function fetchTokenBalance(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.result;
}

async function fetchPrice() {
  const response = await fetch(cgAPI);
  const data = await response.json();
  return data["nft-champions"]["usd"];
}

// Hauptfunktion
async function main() {
  document.getElementById("button").style.cursor = "wait";
  document.getElementById("button").innerHTML = "Loading...";

  const price = await fetchPrice();
  const burnAmount = await fetchTokenBalance(burnApi);
  const walletBalances = await fetchWalletBalances(urlAPI);
  const results = calculateStats(walletBalances, burnAmount, price);
  
  updateUI(results);
  
  document.getElementById("button").style.cursor = "pointer";
  document.getElementById("button").innerHTML = "Refresh";
  }
  
  async function fetchPrice() {
  const response = await fetch(cgAPI);
  const data = await response.json();
  return data["nft-champions"]["usd"];
  }
  
  async function fetchTokenBalance(apiURL) {
  const response = await fetch(apiURL);
  const data = await response.json();
  return parseInt(data.result);
  }
  
  async function fetchWalletBalances(apiURLs) {
  const promises = apiURLs.map(async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return parseInt(data.result);
  });
  
  return Promise.all(promises);
  }
  
  function calculateStats(walletBalances, burnAmount, price) {
  // Calculate the locked and circulating supply, and the market cap
  // Perform other calculations like vesting percentages
  
  // Return the results as an object
  return {
  circSupply: formattedCircSupply,
  percentageOfCircSupply: percentageOfCircSupply,
  price: price,
  marketCap: formattedMcap,
  lastRefresh: getClientTime(),
  };
  }
  
  function updateUI(results) {
  document.getElementById("myText").innerHTML = '$CHAMP STATS: \nCirc.Supply: ${ results.circSupply } (${results.percentageOfCircSupply} of TotalSupply)\nPrice: $${results.price}\nMarket cap: $${results.marketCap}\nlast refresh: ${results.lastRefresh}';
  }
  
  // Initialize the app by calling main()
  main();

