// CREATE CONNECTION //
//var mysql = require('mysql');
var tools = require('./function.js');

// Tuesday try and block out lines 6 - 19 and see if it runs! 
// var connection = mysql.createConnection({
//     host: 'localhost',
//     port: 8889,
//     user: 'root',
//     password: 'root', 
//     database: 'bamazon'
// })

// connection.connect(function(err){
//     if (err) {
//         console.log(err);
//         return;
//     }
// })
// END CONNECTION CODE //

// BEGIN IMPORT OF FUNCTIONS/METHODS
//tools.prompt_test();

tools.get_Storeitems_toItemsArray();

//console.log('first');
