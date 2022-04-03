
//initializing
var p2eAPI = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xc6695c80913a37219929ec26f746283842d02cd0&tag=latest&apikey=T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
var treasuryApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xceeae72d35f5e6fb3e479f0e21eb0f1974146cd4&tag=latest&apikey=T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
var devApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xf2e4efbcec08d128205d299d6358e7d095eab2f4&tag=latest&apikey=T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
var deployerApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xd5a7661d150b41de85a18f756e0fda78c4bb7d0a&tag=latest&apikey=T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";
var tsVestingApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xa43a1fa8435483c49c79b37d729c47821eac6cda&tag=latest&apikey=M7NCTMF6JMJE9ZBMF9T3GJFQMN6P33M3H9";
var privApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0x531bcca5bd3323bb5338b6db1dde7532b7299ac1&tag=latest&apikey=M7NCTMF6JMJE9ZBMF9T3GJFQMN6P33M3H9";
var tsInc1Api = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0x4efaab74cc550f0e380df685a23d0f9edea1d162&tag=latest&apikey=M7NCTMF6JMJE9ZBMF9T3GJFQMN6P33M3H9";
var tsInc2Api = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0xf3763abe055577beb7addb7e3554c0353be0cbe9&tag=latest&apikey=M7NCTMF6JMJE9ZBMF9T3GJFQMN6P33M3H9";
var lockedApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0x586c21a779c24efd2a8af33c9f7df2a2ea9af55c&tag=latest&apikey=M7NCTMF6JMJE9ZBMF9T3GJFQMN6P33M3H9";
var burnApi = "https://api.polygonscan.com/api?module=account&action=tokenbalance&contractaddress=0x8f9E8e833A69Aa467E42c46cCA640da84DD4585f&address=0x000000000000000000000000000000000000dead&tag=latest&apikey=T31REPDPQTXC5T8NRSKEJPXN8BW21241B9";

var cgAPI = "https://api.coingecko.com/api/v3/simple/price?ids=nft-champions&vs_currencies=USD";

var urlAPI = [p2eAPI,treasuryApi,devApi,deployerApi,tsVestingApi,privApi,tsInc1Api,tsInc2Api,lockedApi];

var burnRes= "";//Result string for the burn amount

var arrayRes =[];//Result array

var cgRes = "";//Result from CG API

var totalSupply = 1000000000;//total supply

var decimalChamp = 100000000;//decimal 8


//funtion that formats a number in percent
function percentage(burnedTokens,circSupply){

    var TS = totalSupply-burnedTokens;
    var percentageCirc = circSupply / TS;
    var s = Number(percentageCirc).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}); 
    return s;
}

//gets client time
function getClientTime(){
let s =  new Date().toLocaleString();
return s;
}    

//formats big numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");//formating of the number
}

function main(){
    document.getElementById('button').style.cursor = 'wait';
    document.getElementById('button').innerHTML = 'loading...';
    setTimeout(refresh, 50)
}

//main function
function refresh(){
    
    //initializing variables
    var burnRes= "";

    var arrayRes =[];

    var cgRes = "";

    //every wallet except burn
    for (let index = 0; index < urlAPI.length; index++) {
        
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: urlAPI[index],
            async:false,
            success: function (data) { 
                        
                arrayRes.push(data.result)
            },
            dataType:"json"
        });
    }


    //burn
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-14",
        dataType: "json",
        url: burnApi ,
        async:false,
        success: function (data) {  
                
            burnRes= data.result
        },
        dataType:"json"
    });

    //string to int
    var arrayOfNumbers = arrayRes.map(Number);

    //summing locked champs
    var lockedChamps =0;
    for (let i = 0; i < arrayOfNumbers.length; i++) {
        lockedChamps += arrayOfNumbers[i];
        
    }
    

    var burnedTokens = parseInt(burnRes)/decimalChamp;

    var lockedChamps = Math.floor(lockedChamps/decimalChamp);//devided by decimal

    var circSupply = totalSupply - burnedTokens - lockedChamps;
    
    circSupply = parseInt(circSupply);

    

    //pulling data from CGApi
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET","https://api.coingecko.com/api/v3/simple/price?ids=nft-champions&vs_currencies=USD",false);
    xhReq.send(null);

    var priceData = JSON.parse(xhReq.responseText);
    //accessing JSON Data
    priceData = priceData["nft-champions"]["usd"];
    var Marketcap = parseInt(circSupply* parseFloat(priceData));

    //output
    document.getElementById('myText').innerHTML = "$CHAMP STATS: \nCirc.Supply: "+ numberWithCommas(circSupply) +" ("+percentage(burnedTokens,circSupply) + " of TS)\n"+"Price: $" + priceData +"\n"+ "Market cap: $"+ numberWithCommas(Marketcap)+ "\nlast update:("+getClientTime()+")" ;
    
    //if output NaN caused by API Limit
    if (Number.isNaN(circSupply)) {
        window.alert('Please refresh!')
    }
    document.getElementById('button').style.cursor = 'pointer';
    document.getElementById('button').innerHTML = 'Refresh'
    
}

//starts the programm
main();

