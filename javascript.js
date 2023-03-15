import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/champStats", async (req, res) => {
  try {
    const champStats = await fetchData();
    res.json(champStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

async function fetchData() {
//initializing
const p2eAPI = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0x2ac5c6400bb5714cfaec5e45f58e31a34dda8f3e&tag=latest&apikey=T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
const treasuryApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xceeae72d35f5e6fb3e479f0e21eb0f1974146cd4&tag=latest&apikey=T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
const devApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xf2e4efbcec08d128205d299d6358e7d095eab2f4&tag=latest&apikey=T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
const deployerApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xd5a7661d150b41de85a18f756e0fda78c4bb7d0a&tag=latest&apikey=T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
const tsVestingApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xa43a1fa8435483c49c79b37d729c47821eac6cda&tag=latest&apikey=M7NCTMF6JMJE9ZBMF9T3GJFQMN6P33M3H9";
const privApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0x531bcca5bd3323bb5338b6db1dde7532b7299ac1&tag=latest&apikey=M7NCTMF6JMJE9ZBMF9T3GJFQMN6P33M3H9";
const tsInc1Api = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0x4efaab74cc550f0e380df685a23d0f9edea1d162&tag=latest&apikey=M7NCTMF6JMJE9ZBMF9T3GJFQMN6P33M3H9";
const tsInc2Api = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xf3763abe055577beb7addb7e3554c0353be0cbe9&tag=latest&apikey=M7NCTMF6JMJE9ZBMF9T3GJFQMN6P33M3H9";
const lockedApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0x586c21a779c24efd2a8af33c9f7df2a2ea9af55c&tag=latest&apikey=M7NCTMF6JMJE9ZBMF9T3GJFQMN6P33M3H9";
const burnApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0x000000000000000000000000000000000000dead&tag=latest&apikey=T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
const tsdifferentWallet= "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xddcbec8a64d216dfcff58d7b2b76fbdd9d9140bc&tag=latest&apikey=8V4CJA7D73SQ2RB9T8NZ28QRVDEZY7G8YD";

const cgAPI = "https://api.coingecko.com/api/v3/simple/price?ids=nft-champions&vs_currencies=USD";

var urlAPI = [p2eAPI,treasuryApi,devApi,deployerApi,tsVestingApi,privApi,tsInc1Api,tsInc2Api,lockedApi, tsdifferentWallet];

const [
    p2eResponse,
    treasuryResponse,
    devResponse,
    deployerResponse,
    tsVestingResponse,
    privResponse,
    tsInc1Response,
    tsInc2Response,
    lockedResponse,
    burnResponse,
    tsdifferentWalletResponse
  ] = await Promise.all([
    axios.get(p2eAPI),
    axios.get(treasuryApi),
    axios.get(devApi),
    axios.get(deployerApi),
    axios.get(tsVestingApi),
    axios.get(privApi),
    axios.get(tsInc1Api),
    axios.get(tsInc2Api),
    axios.get(lockedApi),
    axios.get(burnApi),
    axios.get(tsdifferentWallet)
  ]);


var burnRes= "";//Result string for the burn amount

var arrayRes =[];//Result array

var cgRes = "";//Result from CG API

var totalSupply = 1000000000;//total supply
var tsVestingStartingSupply = 87004430
var privVestingStartingSupply = 49524000
var tsIncVestingStart = 17866667
var tsIncSecondWallet = 9929400
var moonWhaleVestingStart = 20033333

const decimalChamp = 100000000;//decimal 8

const p2eBalance = parseInt(p2eResponse.data.result) / decimalChamp;
const treasuryBalance = parseInt(treasuryResponse.data.result) / decimalChamp;
const devBalance = parseInt(devResponse.data.result) / decimalChamp;
const deployerBalance = parseInt(deployerResponse.data.result) / decimalChamp;
const tsVestingBalance = parseInt(tsVestingResponse.data.result) / decimalChamp;
const privBalance = parseInt(privResponse.data.result) / decimalChamp;
const tsInc1Balance = parseInt(tsInc1Response.data.result) / decimalChamp;
const tsInc2Balance = parseInt(tsInc2Response.data.result) / decimalChamp;
const lockedBalance = parseInt(lockedResponse.data.result) / decimalChamp;
const burnBalance = parseInt(burnResponse.data.result) / decimalChamp;
const tsdifferentBalance = parseInt(tsdifferentWalletResponse.data.result) / decimalChamp;

  // Prepare data
  const champStats = {
    p2eBalance: p2eBalance,
    treasuryBalance: treasuryBalance,
    devBalance: devBalance,
    deployerBalance: deployerBalance,
    tsVestingBalance: tsVestingBalance,
    privBalance: privBalance,
    tsInc1Balance: tsInc1Balance,
    tsInc2Balance: tsInc2Balance,
    lockedBalance: lockedBalance,
    burnBalance: burnBalance,
    tsdifferentBalance: tsdifferentBalance
  };

  return champStats;
}

async function fetchPriceData() {
    try {
      const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=nft-champions&vs_currencies=USD");
      const priceData = response.data;
      const price = priceData["nft-champions"]["usd"];
      console.log("Price:", price);
      return price;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
async function main() {
    const price = await fetchPriceData();
    const champStats = await fetchData();
    const totalSupply = 1000000000;
    // Berechnung der Gesamtsumme
    const vestedSupply =
      champStats.p2eBalance +
      champStats.treasuryBalance +
      champStats.devBalance +
      champStats.deployerBalance +
      champStats.tsVestingBalance +
      champStats.privBalance +
      champStats.tsInc1Balance+
      champStats.tsInc2Balance+
      champStats.lockedBalance+
      champStats.burnBalance+
      champStats.tsdifferentBalance;
  
    // Berechnung der verbleibenden Token (Gesamtsumme - Burn Supply)
    const remainingTokens = totalSupply -vestedSupply;
  
    // Berechnung der Marktkapitalisierung
    const marketCap = remainingTokens * price;
    
  
    //formats big numbers
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "_");//formating of the number
    }
    // Ausgabe der Ergebnisse
    module.exports = {
        marketCap,
        remainingTokens
  }
    };
    
  
  main();

