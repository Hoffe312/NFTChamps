// Configuration
const contractAddress = "0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f";
const apiKey = "T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
const decimals = 100000000;
const totalSupply = 1000000000;

// API URLs
const polygonScanUrl = "https://api.polygonscan.com/api";
const coingeckoUrl = "https://api.coingecko.com/api/v3/simple/price?ids=nft-champions&vs_currencies=USD";

// Wallet addresses
const walletAddresses = {
  p2e: "0x2ac5c6400bb5714cfaec5e45f58e31a34dda8f3e",
  treasury: "0xceeae72d35f5e6fb3e479f0e21eb0f1974146cd4",
  dev: "0xf2e4efbcec08d128205d299d6358e7d095eab2f4",
  deployer: "0xd5a7661d150b41de85a18f756e0fda78c4bb7d0a",
  tsVesting: "0xa43a1fa8435483c49c79b37d729c47821eac6cda",
  priv: "0x531bcca5bd3323bb5338b6db1dde7532b7299ac1",
  tsInc1: "0x4efaab74cc550f0e380df685a23d0f9edea1d162",
  tsInc2: "0xf3763abe055577beb7addb7e3554c0353be0cbe9",
  locked: "0x586c21a779c24efd2a8af33c9f7df2a2ea9af55c",
  burn: "0x000000000000000000000000000000000000dead",
  tsDifferentWallet: "0xddcbec8a64d216dfcff58d7b2b76fbdd9d9140bc"
};

// Vesting starting supplies
const vestingStartingSupplies = {
  tsVesting: 87004430,
  privVesting: 49524000,
  tsIncVesting: 17866667,
  tsIncSecondWallet: 9929400,
  moonWhaleVesting: 20033333
};

// Helper functions
function createApiUrl(address) {
  return `${polygonScanUrl}?module=account&action=tokenbalance&contractaddress=${contractAddress}&address=${address}&tag=latest&apikey=${apiKey}`;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function percentage(numerator, denominator) {
  return Number(numerator / denominator).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 });
}

function getClientTime() {
  return new Date().toLocaleString();
}

function fetchData(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: url,
            success: function (data) {
                resolve(data.result);
            },
            error: function (error) {
                console.error("Error fetching data:", error);
                reject(error);
            }
        });
    });
}

async function main() {
    document.getElementById('button').style.cursor = 'wait';
    document.getElementById('button').innerHTML = 'loading...';
    setTimeout(refresh, 50);
    refresh();
}

// Main function
async function refresh() {
    // Initializing variables
    const burnRes = await fetchData(burnApi);
    const arrayRes = [];

    // Every wallet except burn
    for (const url of urlAPI) {
        const result = await fetchData(url);
        arrayRes.push(result);
    }

    // Code continues from here as before...

    // Output
    document.getElementById('myText').innerHTML = "$CHAMP STATS: \nCirc.Supply: "
        + formattedCircSupply + "(" + percentageOfCircSupply
        + " of TotalSupply)\nPrice: $" + priceData + "\n"
        + "Market cap: $" + formattedMcap
        + "\nlast refresh: " + getClientTime();

    // If output NaN caused by API Limit
    if (Number.isNaN(circSupply)) {
        window.alert('Please refresh!');
    }
    document.getElementById('button').style.cursor = 'pointer';
    document.getElementById('button').innerHTML = 'Refresh';

    return formattedCircSupply, priceData, formattedMcap;
}

// Starts the program
main();