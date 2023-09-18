const data = {
    Account: {
        "Account Name": "Firefly",
        Order: [
            {
                OrderID: "order103",
                Product: [
                    {
                        "Product Name": "Bowler Hat",
                        ProductID: 858383,
                        SKU: "0406654608",
                        Description: {
                            Colour: "Purple",
                            Width: 300,
                            Height: 200,
                            Depth: 210,
                            Weight: 0.75,
                        },
                        Price: 34.45,
                        Quantity: 2,
                    },
                    {
                        "Product Name": "Trilby hat",
                        ProductID: 858236,
                        SKU: "0406634348",
                        Description: {
                            Colour: "Orange",
                            Width: 300,
                            Height: 200,
                            Depth: 210,
                            Weight: 0.6,
                        },
                        Price: 21.67,
                        Quantity: 1,
                    },
                ],
            },
            {
                OrderID: "order104",
                Product: [
                    {
                        "Product Name": "Bowler Hat",
                        ProductID: 858383,
                        SKU: "040657863",
                        Description: {
                            Colour: "Purple",
                            Width: 300,
                            Height: 200,
                            Depth: 210,
                            Weight: 0.75,
                        },
                        Price: 34.45,
                        Quantity: 4,
                    },
                    {
                        ProductID: 345664,
                        SKU: "0406654603",
                        "Product Name": "Cloak",
                        Description: {
                            Colour: "Black",
                            Width: 30,
                            Height: 20,
                            Depth: 210,
                            Weight: 2,
                        },
                        Price: 107.99,
                        Quantity: 1,
                    },
                ],
            },
        ],
    },
};

async function evaluteExpression(expression) {
    const result = await jsonata(expression).evaluate(data);
    console.log(result);
}

// evaluteExpression("$keys()"); // return key till first level
// evaluteExpression("*.$keys()"); // return key till second level
// evaluteExpression("**.$keys()"); // return key till third level

// evaluteExpression("$lookup(Account.Order, 'Product')");

evaluteExpression(`$each(Account, function($value, $key){
    $key  & ': ' & $value
})`);

evaluteExpression(`$merge(Account.Order)`); // It merge multiple object from array, object have same value in any property then we get last object's property in output value.

evaluteExpression("$spread(Account.Order.Product)"); // sprade object into array of objects which object contains each key value pair
