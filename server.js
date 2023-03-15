import express from 'express'; // import express module
const app = express(); // create an express application
import {refresh} from './javascript.js';

app.get('/api/balances', function(req, res){
    // call the refresh function and save the result in a variable
    var balances = refresh();
    res.json(balances); 
});

app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});