mysql = require('mysql');
inquirer = require('inquirer');

var tools = {
    items_array: [],
    connection: mysql.createConnection({
        host: 'localhost',
        port: 8889,
        user: 'root',
        password: 'root',
        database: 'bamazon'
    }),
    prompt_test: function (choices) {
        inquirer.prompt([
            {
                type: 'list',
                name: 'item_id',
                message: 'Which item would you like to purchase?',
                choices: choices
            }
        ]).then(function (answers) {
            if (answers.item_id) {
                //console.log(parseInt(answers.item_id));
                var parsedId = parseInt(answers.item_id);
                inquirer.prompt([
                    {
                        type: 'input', 
                        name: 'quantity',
                        message: 'How many would you like to purchase?',
                    }
                ]).then(function(answers) {
                    
                        // run sql query
                    var quantity = parseInt(answers.quantity);    
                    tools.itemQuery(parsedId, quantity);
                
                })

                // run the function here // 
                
            }

        })
    },
    get_Storeitems_toItemsArray: function () {   // When the program runs, this function will start the process by getting the names of all the items in the store >
        var sql = 'SELECT * FROM products'      // and placing them into the items_array which will be used to show the customer items for sale. 
        tools.connection.query(sql, function (err, res) {
            if (err) {
                console.log(err);
                tools.connection.end();
            }
            var x = res
            for (var i = 0; i < x.length; i++) {
                //console.log(x[i].product_name)
                tools.items_array.push((x[i].item_id).toString() + ' ' + x[i].product_name);
            }
            //console.log(tools.items_array)

            tools.prompt_test(tools.items_array);
        })
    },
    itemQuery: function(parse_id, quantity) {
        console.log(parse_id, quantity);
        var sql = 'SELECT item_id, price, stock_quantity from products WHERE item_id =?'

        tools.connection.query(sql, parse_id, function(err, res){
            if (err) {
                console.log(err);
                return;
            }
            //console.log(res[0].stock_quantity, quantity);
            if (res[0].stock_quantity < quantity) {
                console.log('There are only ' + res[0].stock_quantity + 'in stock. Please update your order');
                tools.get_Storeitems_toItemsArray();
            }
            else {
                var updatedQuantity = res[0].stock_quantity - quantity;
                var cost = res[0].price * quantity;
                tools.connection.query('UPDATE products SET ? WHERE ?', [
                    {stock_quantity: updatedQuantity},
                    {item_id: parse_id}
                ],
                function(err, res){
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log('Your order total is ' + cost);

                });
            }
            //console.log(res);

        })
        tools.get_Storeitems_toItemsArray();
    }

};

module.exports = tools;